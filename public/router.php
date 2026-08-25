<?php
/**
 * Router dla wbudowanego serwera PHP (`npm run dev:api`).
 * Na home.pl jego rolę pełni .htaccess.
 */
declare(strict_types=1);

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/');

if (preg_match('#^/api/data(/|$)#', $uri)) {
    http_response_code(403);
    exit('Forbidden');
}

$path = __DIR__ . $uri;
if ($uri !== '/' && is_file($path)) {
    return false;
}

if ($uri === '/admin' || $uri === '/admin/') {
    require __DIR__ . '/admin/index.php';
    return true;
}

http_response_code(404);
echo 'Not found';
return true;
