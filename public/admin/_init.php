<?php
declare(strict_types=1);

require_once __DIR__ . '/_boot.php';

if (!has_password()) {
    redirect('/admin/setup.php');
}

if (empty($_SESSION['admin'])) {
    redirect('/admin/login.php');
}
