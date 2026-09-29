<?php
/**
 * Contact form → Resend email.
 *
 * POST /api/contact.php  JSON body with lead fields
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed.'], 405);
}

$raw = file_get_contents('php://input');
$data = is_string($raw) && $raw !== '' ? json_decode($raw, true) : null;
if (!is_array($data)) {
    json_response(['error' => 'Invalid JSON body.'], 400);
}

// Honeypot — bots fill this; humans leave it empty.
if (trim((string) ($data['website'] ?? '')) !== '') {
    json_response(['ok' => true]);
}

$phone = trim((string) ($data['phone'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$clientType = trim((string) ($data['clientType'] ?? ''));
$city = trim((string) ($data['city'] ?? ''));
$service = trim((string) ($data['service'] ?? ''));
$budget = trim((string) ($data['budget'] ?? ''));
$listingUrl = trim((string) ($data['listingUrl'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

$errors = [];
if ($phone === '') {
    $errors[] = 'Podaj numer telefonu.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Podaj prawidłowy adres email.';
}
if ($service === '') {
    $errors[] = 'Wybierz usługę.';
}
if ($errors !== []) {
    json_response(['error' => implode(' ', $errors)], 422);
}

$from = env('EMAIL_FROM', 'onboarding@resend.dev');
$to = env('EMAIL_TO', 'biuro@carmentor.pl');
if ($from === null || $to === null) {
    json_response(['error' => 'Email is not configured.'], 500);
}

$row = static function (string $label, string $value): string {
    if ($value === '') {
        return '';
    }
    return '<tr><td style="padding:6px 12px 6px 0;color:#667;vertical-align:top;">'
        . e($label)
        . '</td><td style="padding:6px 0;color:#111;">'
        . nl2br(e($value))
        . '</td></tr>';
};

$html = '<h2 style="margin:0 0 16px;font-family:sans-serif;">Nowe zapytanie z formularza</h2>'
    . '<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;line-height:1.45;">'
    . $row('Telefon', $phone)
    . $row('Email', $email)
    . $row('Forma', $clientType)
    . $row('Miasto', $city)
    . $row('Usługa', $service)
    . $row('Budżet', $budget)
    . $row('Link do ogłoszenia', $listingUrl)
    . $row('Dodatkowe informacje', $message)
    . '</table>';

$result = send_resend_email([
    'from' => $from,
    'to' => $to,
    'subject' => 'Zapytanie: ' . $service . ($city !== '' ? ' — ' . $city : ''),
    'html' => $html,
    'reply_to' => $email,
]);

if (!$result['ok']) {
    json_response([
        'error' => 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń.',
        'detail' => $result['error'] ?? null,
    ], 502);
}

json_response(['ok' => true]);
