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
const ALLOWED_IMAGE_TYPES = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/webp' => 'webp',
];

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

/** @return list<array<string, mixed>> */
function public_cars(): array
{
    return array_values(array_filter(
        load_cars(),
        static fn(array $car): bool => ($car['published'] ?? true) === true
    ));
}

/** @return array<string, mixed>|null */
function find_car(string $slug, bool $publishedOnly = false): ?array
{
    $source = $publishedOnly ? public_cars() : load_cars();
    foreach ($source as $car) {
        if (($car['slug'] ?? '') === $slug) {
            return $car;
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
 * Składa auto z formularza. Nigdy nie ufamy $_POST 1:1.
 *
 * @param array<string, mixed> $post
 * @param list<string> $gallery
 * @return array<string, mixed>
 */
function car_from_post(array $post, array $gallery, ?string $forcedSlug = null): array
{
    $brand = trim((string) ($post['brand'] ?? ''));
    $model = trim((string) ($post['model'] ?? ''));
    $slug = $forcedSlug ?: slugify(trim((string) ($post['slug'] ?? '')) ?: ($brand . ' ' . $model));

    $paragraphs = preg_split("/\n\s*\n/", trim((string) ($post['detailedDescription'] ?? ''))) ?: [];
    $paragraphs = array_values(array_filter(array_map('trim', $paragraphs), static fn(string $p): bool => $p !== ''));

    $titles = $post['equipment_title'] ?? [];
    $itemsBlocks = $post['equipment_items'] ?? [];
    $sections = [];

    if (is_array($titles) && is_array($itemsBlocks)) {
        foreach ($titles as $index => $title) {
            $title = trim((string) $title);
            $lines = preg_split("/\r\n|\n|\r/", (string) ($itemsBlocks[$index] ?? '')) ?: [];
            $items = array_values(array_filter(array_map('trim', $lines), static fn(string $line): bool => $line !== ''));
            if ($title === '' && $items === []) {
                continue;
            }
            $sections[] = [
                'title' => $title !== '' ? $title : 'Wyposażenie',
                'items' => $items,
            ];
        }
    }

    $year = filter_var($post['year'] ?? 0, FILTER_VALIDATE_INT);
    $tag = ($post['tag'] ?? '') === 'Sprawdzone' ? 'Sprawdzone' : 'Od ręki';

    return [
        'slug' => $slug,
        'brand' => $brand,
        'model' => $model,
        'year' => $year !== false ? $year : (int) date('Y'),
        'description' => trim((string) ($post['description'] ?? '')),
        'detailedDescription' => $paragraphs,
        'equipmentSections' => $sections,
        'engine' => trim((string) ($post['engine'] ?? '')),
        'power' => trim((string) ($post['power'] ?? '')),
        'mileage' => trim((string) ($post['mileage'] ?? '')),
        'gearbox' => trim((string) ($post['gearbox'] ?? '')),
        'price' => trim((string) ($post['price'] ?? '')),
        'otomotoUrl' => trim((string) ($post['otomotoUrl'] ?? '')),
        'tag' => $tag,
        'gallery' => $gallery,
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
