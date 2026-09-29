<?php
declare(strict_types=1);

$sessionDir = dirname(__DIR__) . '/api/data/sessions';
if (!is_dir($sessionDir) && !mkdir($sessionDir, 0775, true) && !is_dir($sessionDir)) {
    throw new RuntimeException('Nie można utworzyć katalogu sesji.');
}
if (!is_writable($sessionDir)) {
    throw new RuntimeException('Katalog sesji nie ma praw zapisu.');
}

session_save_path($sessionDir);
session_set_cookie_params([
    'httponly' => true,
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
    'samesite' => 'Lax',
    'path' => '/',
]);
session_start();
require_once dirname(__DIR__) . '/api/lib.php';
ensure_data_dir();
