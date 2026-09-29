<?php
/**
 * CarMentor — „baza” to zwykły plik JSON.
 *
 * Skąd ten wybór:
 * - kilka aut, jeden człowiek w panelu
 * - na home.pl nie trzeba zakładać MySQL
 * - otwierasz cars.json i widzisz dokładnie to, co jest na stronie
 *
 * Przepływ:
 * 1. React woła GET /api/cars.php
 * 2. Panel /admin zapisuje formularzem POST
 * 3. flock() blokuje plik przy zapisie, żeby dwa requesty nie zepsuły JSON-a
 *
 * MySQL weźmiesz, gdy pojawi się wielu edytorów albo setki ogłoszeń.
 * Wtedy zmieni się tylko ten plik — frontend dalej woła to samo API.
 */

declare(strict_types=1);

const DATA_DIR = __DIR__ . '/data';
const CARS_FILE = DATA_DIR . '/cars.json';
const AUTH_FILE = DATA_DIR . '/auth.json';
const UPLOADS_DIR = __DIR__ . '/../uploads/cars';
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_PDF_BYTES = 15 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];
const DOCUMENT_TYPES = ['service-history', 'car-vertical'];

function ensure_data_dir(): void
{
    if (!is_dir(DATA_DIR) && !mkdir(DATA_DIR, 0775, true) && !is_dir(DATA_DIR)) {
        throw new RuntimeException('Nie mogę utworzyć katalogu data/.');
    }
    if (!is_dir(UPLOADS_DIR) && !mkdir(UPLOADS_DIR, 0775, true) && !is_dir(UPLOADS_DIR)) {
        throw new RuntimeException('Nie mogę utworzyć katalogu uploads/.');
    }
}

function read_json(string $path, mixed $default = []): mixed
{
    if (!is_file($path)) {
        return $default;
    }

    $handle = fopen($path, 'rb');
    if ($handle === false) {
        throw new RuntimeException('Nie mogę odczytać pliku: ' . $path);
    }

    flock($handle, LOCK_SH);
    $raw = stream_get_contents($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    $decoded = json_decode($raw !== false ? $raw : '', true);
    return is_array($decoded) || is_object($decoded) ? $decoded : $default;
}

function write_json(string $path, mixed $data): void
{
    ensure_data_dir();

    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        throw new RuntimeException('Nie mogę zapisać JSON-a.');
    }

    $handle = fopen($path, 'c+b');
    if ($handle === false) {
        throw new RuntimeException('Nie mogę otworzyć pliku do zapisu: ' . $path);
    }

    flock($handle, LOCK_EX);
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, $json . "\n");
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);
}

/** @return list<array<string, mixed>> */
function load_cars(): array
{
    $cars = read_json(CARS_FILE, []);
    return is_array($cars) ? array_values($cars) : [];
}

/** @param list<array<string, mixed>> $cars */
function save_cars(array $cars): void
{
    write_json(CARS_FILE, array_values($cars));
}

/**
 * @param array<string, mixed> $car
 * @return array<string, mixed>
 */
function normalize_car(array $car): array
{
    $car['detailedDescription'] = detailed_description_to_html($car['detailedDescription'] ?? '');
    return $car;
}

/** @return list<array<string, mixed>> */
function public_cars(): array
{
    return array_values(array_map(
        'normalize_car',
        array_filter(
            load_cars(),
            static fn(array $car): bool => ($car['published'] ?? true) === true
        )
    ));
}

/** @return array<string, mixed>|null */
function find_car(string $slug, bool $publishedOnly = false): ?array
{
    $source = $publishedOnly ? public_cars() : load_cars();
    foreach ($source as $car) {
        if (($car['slug'] ?? '') === $slug) {
            return $publishedOnly ? $car : normalize_car($car);
        }
    }
    return null;
}

/** @param array<string, mixed> $car */
function upsert_car(array $car): void
{
    $cars = load_cars();
    $replaced = false;

    foreach ($cars as $index => $existing) {
        if (($existing['slug'] ?? '') === $car['slug']) {
            $cars[$index] = $car;
            $replaced = true;
            break;
        }
    }

    if (!$replaced) {
        $cars[] = $car;
    }

    save_cars($cars);
}

function delete_car(string $slug): void
{
    $cars = array_values(array_filter(
        load_cars(),
        static fn(array $car): bool => ($car['slug'] ?? '') !== $slug
    ));
    save_cars($cars);

    $folder = UPLOADS_DIR . '/' . $slug;
    if (is_dir($folder)) {
        foreach (glob($folder . '/*') ?: [] as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
        rmdir($folder);
    }
}

function has_password(): bool
{
    $auth = read_json(AUTH_FILE, []);
    return is_array($auth) && isset($auth['passwordHash']) && is_string($auth['passwordHash']);
}

function set_password(string $password): void
{
    if (strlen($password) < 8) {
        throw new InvalidArgumentException('Hasło musi mieć co najmniej 8 znaków.');
    }
    write_json(AUTH_FILE, ['passwordHash' => password_hash($password, PASSWORD_DEFAULT)]);
}

function verify_password(string $password): bool
{
    $auth = read_json(AUTH_FILE, []);
    if (!is_array($auth) || !isset($auth['passwordHash']) || !is_string($auth['passwordHash'])) {
        return false;
    }
    return password_verify($password, $auth['passwordHash']);
}

function slugify(string $value): string
{
    $map = [
        'ą' => 'a', 'ć' => 'c', 'ę' => 'e', 'ł' => 'l', 'ń' => 'n',
        'ó' => 'o', 'ś' => 's', 'ź' => 'z', 'ż' => 'z',
        'Ą' => 'a', 'Ć' => 'c', 'Ę' => 'e', 'Ł' => 'l', 'Ń' => 'n',
        'Ó' => 'o', 'Ś' => 's', 'Ź' => 'z', 'Ż' => 'z',
    ];
    $value = strtr($value, $map);
    $value = strtolower($value);
    $value = preg_replace('/[^a-z0-9]+/', '-', $value) ?? '';
    return trim($value, '-') ?: 'auto';
}

function json_response(mixed $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/** Load KEY=VALUE pairs from .env; does not override existing env vars. */
function load_env(): void
{
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;

    $candidates = [
        dirname(__DIR__, 2) . '/.env',
        dirname(__DIR__) . '/.env',
        __DIR__ . '/.env',
    ];

    $path = null;
    foreach ($candidates as $candidate) {
        if (is_file($candidate) && is_readable($candidate)) {
            $path = $candidate;
            break;
        }
    }

    if ($path === null) {
        return;
    }

    $lines = file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        return;
    }

    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        if (!str_contains($line, '=')) {
            continue;
        }

        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if ($key === '') {
            continue;
        }

        if (
            (str_starts_with($value, '"') && str_ends_with($value, '"'))
            || (str_starts_with($value, "'") && str_ends_with($value, "'"))
        ) {
            $value = substr($value, 1, -1);
        }

        $existing = $_ENV[$key] ?? getenv($key);
        if ($existing !== false && $existing !== null && $existing !== '') {
            continue;
        }

        $_ENV[$key] = $value;
        putenv($key . '=' . $value);
    }
}

function env(string $key, ?string $default = null): ?string
{
    load_env();
    $value = $_ENV[$key] ?? getenv($key);
    if ($value === false || $value === null || $value === '') {
        return $default;
    }
    return (string) $value;
}

/**
 * Send email via Resend HTTP API (cURL; no SDK).
 *
 * @param array{from: string, to: string|list<string>, subject: string, html: string, reply_to?: string} $payload
 * @return array{ok: bool, status: int, body: mixed, error?: string}
 */
function send_resend_email(array $payload): array
{
    $apiKey = env('EMAIL_API_KEY');
    if ($apiKey === null || $apiKey === '') {
        return [
            'ok' => false,
            'status' => 0,
            'body' => null,
            'error' => 'Brak EMAIL_API_KEY w .env.',
        ];
    }

    $to = $payload['to'];
    $body = [
        'from' => $payload['from'],
        'to' => is_array($to) ? array_values($to) : [$to],
        'subject' => $payload['subject'],
        'html' => $payload['html'],
    ];
    if (!empty($payload['reply_to'])) {
        $body['reply_to'] = $payload['reply_to'];
    }

    $ch = curl_init('https://api.resend.com/emails');
    if ($ch === false) {
        return [
            'ok' => false,
            'status' => 0,
            'body' => null,
            'error' => 'Nie udało się zainicjować cURL.',
        ];
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        CURLOPT_TIMEOUT => 20,
    ]);

    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);

    if ($raw === false) {
        return [
            'ok' => false,
            'status' => $status,
            'body' => null,
            'error' => $curlError !== '' ? $curlError : 'Błąd połączenia z Resend.',
        ];
    }

    $decoded = json_decode($raw, true);

    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'body' => $decoded ?? $raw,
        'error' => $status >= 200 && $status < 300 ? null : 'Resend odrzucił żądanie.',
    ];
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf']) || !is_string($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(16));
    }
    return $_SESSION['csrf'];
}

function require_csrf(): void
{
    $sent = $_POST['csrf'] ?? '';
    $expected = $_SESSION['csrf'] ?? '';
    if (!is_string($sent) || !is_string($expected) || $sent === '' || !hash_equals($expected, $sent)) {
        http_response_code(403);
        exit('Nieprawidłowy token CSRF. Odśwież stronę i spróbuj jeszcze raz.');
    }
}

function redirect(string $path): void
{
    header('Location: ' . $path);
    exit;
}

/** @param array<string, mixed> $car */
function car_title(array $car): string
{
    return trim(($car['brand'] ?? '') . ' ' . ($car['model'] ?? ''));
}

/**
 * Zamienia legacy tablicę akapitów albo HTML na bezpieczny HTML.
 */
function detailed_description_to_html(mixed $value): string
{
    if (is_array($value)) {
        $parts = [];
        foreach ($value as $paragraph) {
            $text = trim((string) $paragraph);
            if ($text === '') {
                continue;
            }
            $parts[] = '<p>' . htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</p>';
        }
        return implode('', $parts);
    }

    return sanitize_rich_html((string) $value);
}

/**
 * Dopuszcza tylko bezpieczne tagi z edytora Quill.
 */
function sanitize_rich_html(string $html): string
{
    $html = trim($html);
    if ($html === '' || $html === '<p><br></p>' || $html === '<p><br/></p>' || $html === '<p></p>') {
        return '';
    }

    // Usuń całe niebezpieczne bloki zanim strip_tags wypuści ich treść.
    $html = preg_replace('#<(script|style|iframe|object|embed)\b[^>]*>.*?</\1>#is', '', $html) ?? $html;
    $html = strip_tags(
        $html,
        '<p><br><strong><b><em><i><u><s><ul><ol><li><h2><h3><a><blockquote>'
    );

    $previous = libxml_use_internal_errors(true);
    $document = new DOMDocument('1.0', 'UTF-8');
    $wrapped = '<?xml encoding="UTF-8"><div id="rich-root">' . $html . '</div>';
    $loaded = $document->loadHTML($wrapped, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);

    if (!$loaded) {
        return '';
    }

    $root = $document->getElementById('rich-root');
    if (!$root) {
        return '';
    }

    $anchors = $root->getElementsByTagName('a');
    for ($i = $anchors->length - 1; $i >= 0; $i--) {
        $anchor = $anchors->item($i);
        if (!$anchor instanceof DOMElement) {
            continue;
        }

        $attrs = [];
        if ($anchor->hasAttributes()) {
            foreach ($anchor->attributes as $attr) {
                $attrs[] = $attr->name;
            }
        }
        foreach ($attrs as $attrName) {
            if (!in_array(strtolower($attrName), ['href', 'title', 'target', 'rel'], true)) {
                $anchor->removeAttribute($attrName);
            }
        }

        $href = trim($anchor->getAttribute('href'));
        if ($href === '' || !preg_match('~^(https?://|/|#)~i', $href)) {
            $parent = $anchor->parentNode;
            if ($parent) {
                while ($anchor->firstChild) {
                    $parent->insertBefore($anchor->firstChild, $anchor);
                }
                $parent->removeChild($anchor);
            }
            continue;
        }

        $target = strtolower($anchor->getAttribute('target'));
        if ($target === '_blank') {
            $anchor->setAttribute('rel', 'noopener noreferrer');
        } else {
            $anchor->removeAttribute('target');
            $anchor->removeAttribute('rel');
        }
    }

    // Zdejmij atrybuty z pozostałych tagów (np. style/class z Quilla).
    foreach (['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'ul', 'ol', 'li', 'h2', 'h3', 'blockquote'] as $tagName) {
        $nodes = $root->getElementsByTagName($tagName);
        for ($i = $nodes->length - 1; $i >= 0; $i--) {
            $el = $nodes->item($i);
            if (!$el instanceof DOMElement || !$el->hasAttributes()) {
                continue;
            }
            $attrs = [];
            foreach ($el->attributes as $attr) {
                $attrs[] = $attr->name;
            }
            foreach ($attrs as $attrName) {
                $el->removeAttribute($attrName);
            }
        }
    }

    $output = '';
    foreach ($root->childNodes as $child) {
        $output .= $document->saveHTML($child);
    }

    $output = trim($output);
    if ($output === '' || $output === '<p><br></p>' || $output === '<p><br/></p>' || $output === '<p></p>') {
        return '';
    }

    return $output;
}

function normalize_document_type(string $value): string
{
    return in_array($value, DOCUMENT_TYPES, true) ? $value : 'service-history';
}

/**
 * Składa auto z formularza. Nigdy nie ufamy $_POST 1:1.
 *
 * @param array<string, mixed> $post
 * @param list<string> $gallery
 * @return array<string, mixed>
 */
function car_from_post(
    array $post,
    array $gallery,
    ?string $forcedSlug = null,
    string $documentPdf = '',
): array {
    $brand = trim((string) ($post['brand'] ?? ''));
    $model = trim((string) ($post['model'] ?? ''));
    $slug = $forcedSlug ?: slugify(trim((string) ($post['slug'] ?? '')) ?: ($brand . ' ' . $model));

    $year = filter_var($post['year'] ?? 0, FILTER_VALIDATE_INT);
    $tag = ($post['tag'] ?? '') === 'Sprawdzone' ? 'Sprawdzone' : 'Od ręki';
    $documentPdf = trim($documentPdf);

    return [
        'slug' => $slug,
        'brand' => $brand,
        'model' => $model,
        'year' => $year !== false ? $year : (int) date('Y'),
        'description' => trim((string) ($post['description'] ?? '')),
        'detailedDescription' => sanitize_rich_html((string) ($post['detailedDescription'] ?? '')),
        'engine' => trim((string) ($post['engine'] ?? '')),
        'power' => trim((string) ($post['power'] ?? '')),
        'mileage' => trim((string) ($post['mileage'] ?? '')),
        'gearbox' => trim((string) ($post['gearbox'] ?? '')),
        'fuel' => trim((string) ($post['fuel'] ?? '')),
        'drive' => trim((string) ($post['drive'] ?? '')),
        'saleForm' => trim((string) ($post['saleForm'] ?? '')),
        'originCountry' => trim((string) ($post['originCountry'] ?? '')),
        'vin' => trim((string) ($post['vin'] ?? '')),
        'offerFrom' => trim((string) ($post['offerFrom'] ?? '')),
        'registeredInPoland' => isset($post['registeredInPoland']),
        'registrationNumber' => trim((string) ($post['registrationNumber'] ?? '')),
        'firstRegistrationDate' => trim((string) ($post['firstRegistrationDate'] ?? '')),
        'firstOwner' => isset($post['firstOwner']),
        'history' => trim((string) ($post['history'] ?? '')),
        'servicing' => trim((string) ($post['servicing'] ?? '')),
        'price' => trim((string) ($post['price'] ?? '')),
        'otomotoUrl' => trim((string) ($post['otomotoUrl'] ?? '')),
        'tag' => $tag,
        'gallery' => $gallery,
        'documentPdf' => $documentPdf,
        'documentType' => $documentPdf !== ''
            ? normalize_document_type((string) ($post['documentType'] ?? ''))
            : '',
        'published' => isset($post['published']),
    ];
}

/**
 * @param array<string, mixed> $files
 * @return list<string>
 */
function save_uploaded_images(string $slug, array $files): array
{
    ensure_data_dir();
    $saved = [];
    $folder = UPLOADS_DIR . '/' . $slug;

    if (!isset($files['name']) || !is_array($files['name'])) {
        return $saved;
    }

    if (!is_dir($folder) && !mkdir($folder, 0775, true) && !is_dir($folder)) {
        throw new RuntimeException('Nie mogę utworzyć folderu na zdjęcia.');
    }

    $count = count($files['name']);
    for ($i = 0; $i < $count; $i++) {
        if ((int) ($files['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
            continue;
        }
        if ((int) ($files['error'][$i] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
            throw new RuntimeException('Upload zdjęcia nie powiódł się.');
        }
        if ((int) ($files['size'][$i] ?? 0) > MAX_UPLOAD_BYTES) {
            throw new RuntimeException('Zdjęcie jest za duże (max 8 MB).');
        }

        $tmp = (string) ($files['tmp_name'][$i] ?? '');
        $info = $tmp !== '' ? getimagesize($tmp) : false;
        if ($info === false || !isset(ALLOWED_IMAGE_TYPES[$info['mime']])) {
            throw new RuntimeException('Dozwolone są tylko JPG, PNG i WebP.');
        }

        $name = $slug . '-' . date('YmdHis') . '-' . ($i + 1) . '.' . ALLOWED_IMAGE_TYPES[$info['mime']];
        $dest = $folder . '/' . $name;
        if (!move_uploaded_file($tmp, $dest)) {
            throw new RuntimeException('Nie mogę zapisać zdjęcia na dysku.');
        }

        $saved[] = '/uploads/cars/' . $slug . '/' . $name;
    }

    return $saved;
}

function delete_gallery_file(string $url): void
{
    if (!preg_match('#^/uploads/cars/([a-z0-9-]+)/([a-zA-Z0-9._-]+)$#', $url, $match)) {
        return;
    }
    $path = UPLOADS_DIR . '/' . $match[1] . '/' . $match[2];
    if (is_file($path)) {
        unlink($path);
    }
}

function upload_debug_log(string $message, array $context = []): void
{
    ensure_data_dir();
    $line = '[' . date('Y-m-d H:i:s') . '] ' . $message;
    if ($context !== []) {
        $encoded = json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $line .= ' ' . ($encoded !== false ? $encoded : '');
    }
    $line .= "\n";
    @file_put_contents(DATA_DIR . '/upload-debug.log', $line, FILE_APPEND | LOCK_EX);
    error_log('car-mentor upload: ' . trim($line));
}

function upload_error_message(int $errorCode): string
{
    $uploadMax = (string) ini_get('upload_max_filesize');
    $postMax = (string) ini_get('post_max_size');

    return match ($errorCode) {
        UPLOAD_ERR_INI_SIZE => "Plik przekracza limit PHP upload_max_filesize ({$uploadMax}).",
        UPLOAD_ERR_FORM_SIZE => 'Plik przekracza limit formularza.',
        UPLOAD_ERR_PARTIAL => 'Plik został przesłany tylko częściowo.',
        UPLOAD_ERR_NO_FILE => 'Nie wybrano pliku.',
        UPLOAD_ERR_NO_TMP_DIR => 'Brak katalogu tymczasowego na serwerze.',
        UPLOAD_ERR_CANT_WRITE => 'Serwer nie może zapisać pliku tymczasowego na dysku.',
        UPLOAD_ERR_EXTENSION => 'Upload został zablokowany przez rozszerzenie PHP.',
        default => "Nieznany błąd uploadu (kod {$errorCode}).",
    };
}

/**
 * @param array<string, mixed> $file pojedynczy wpis z $_FILES
 */
function save_uploaded_pdf(string $slug, array $file): ?string
{
    ensure_data_dir();

    $errorCode = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);
    $context = [
        'slug' => $slug,
        'name' => (string) ($file['name'] ?? ''),
        'type' => (string) ($file['type'] ?? ''),
        'size' => (int) ($file['size'] ?? 0),
        'error' => $errorCode,
        'tmp_name' => (string) ($file['tmp_name'] ?? ''),
        'upload_max_filesize' => (string) ini_get('upload_max_filesize'),
        'post_max_size' => (string) ini_get('post_max_size'),
        'file_uploads' => (string) ini_get('file_uploads'),
        'upload_tmp_dir' => (string) (ini_get('upload_tmp_dir') ?: sys_get_temp_dir()),
        'uploads_dir' => UPLOADS_DIR,
        'uploads_writable' => is_dir(UPLOADS_DIR) ? is_writable(UPLOADS_DIR) : false,
    ];
    upload_debug_log('PDF upload start', $context);

    if ($errorCode === UPLOAD_ERR_NO_FILE) {
        upload_debug_log('PDF upload skipped: no file');
        return null;
    }
    if ($errorCode !== UPLOAD_ERR_OK) {
        $message = upload_error_message($errorCode);
        upload_debug_log('PDF upload failed: PHP error', ['message' => $message] + $context);
        throw new RuntimeException(
            'Upload pliku PDF nie powiódł się. ' . $message
            . ' (szczegóły w api/data/upload-debug.log)'
        );
    }
    if ((int) ($file['size'] ?? 0) > MAX_PDF_BYTES) {
        upload_debug_log('PDF upload failed: app size limit', $context);
        throw new RuntimeException('Plik PDF jest za duży (max 15 MB).');
    }

    $tmp = (string) ($file['tmp_name'] ?? '');
    $tmpExists = $tmp !== '' && is_file($tmp);
    $isUploaded = $tmp !== '' && is_uploaded_file($tmp);
    if ($tmp === '' || !$isUploaded) {
        upload_debug_log('PDF upload failed: tmp invalid', [
            'tmp_exists' => $tmpExists,
            'is_uploaded_file' => $isUploaded,
        ] + $context);
        throw new RuntimeException(
            'Upload pliku PDF nie powiódł się. Plik tymczasowy jest niedostępny'
            . ' (tmp_exists=' . ($tmpExists ? '1' : '0')
            . ', is_uploaded_file=' . ($isUploaded ? '1' : '0')
            . '). Szczegóły w api/data/upload-debug.log'
        );
    }

    $header = file_get_contents($tmp, false, null, 0, 5);
    $headerOk = $header === '%PDF-';
    if (!$headerOk) {
        upload_debug_log('PDF upload failed: bad magic', [
            'header' => $header === false ? null : bin2hex($header),
        ] + $context);
        throw new RuntimeException('Dozwolone są tylko pliki PDF.');
    }

    $mime = '';
    if (class_exists('finfo')) {
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $detected = $finfo->file($tmp);
        $mime = is_string($detected) ? $detected : '';
    }
    if ($mime !== '' && !in_array($mime, ['application/pdf', 'application/x-pdf'], true)) {
        upload_debug_log('PDF upload failed: bad mime', ['mime' => $mime] + $context);
        throw new RuntimeException('Dozwolone są tylko pliki PDF (wykryto: ' . $mime . ').');
    }

    $folder = UPLOADS_DIR . '/' . $slug;
    if (!is_dir($folder) && !mkdir($folder, 0775, true) && !is_dir($folder)) {
        upload_debug_log('PDF upload failed: mkdir', ['folder' => $folder] + $context);
        throw new RuntimeException('Nie mogę utworzyć folderu na załącznik.');
    }

    $name = $slug . '-dokument-' . date('YmdHis') . '.pdf';
    $dest = $folder . '/' . $name;
    if (!move_uploaded_file($tmp, $dest)) {
        upload_debug_log('PDF upload failed: move_uploaded_file', [
            'dest' => $dest,
            'folder_writable' => is_writable($folder),
        ] + $context);
        throw new RuntimeException(
            'Nie mogę zapisać pliku PDF na dysku (' . $dest . ').'
            . ' Szczegóły w api/data/upload-debug.log'
        );
    }

    upload_debug_log('PDF upload ok', ['dest' => $dest, 'mime' => $mime] + $context);

    return '/uploads/cars/' . $slug . '/' . $name;
}
