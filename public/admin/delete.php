<?php
declare(strict_types=1);

require_once __DIR__ . '/_init.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('/admin/index.php');
}

require_csrf();
$slug = trim((string) ($_POST['slug'] ?? ''));
if ($slug !== '') {
    delete_car($slug);
}

redirect('/admin/index.php');
