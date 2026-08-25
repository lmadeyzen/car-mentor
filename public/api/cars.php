<?php
/**
 * Publiczne API oferty.
 *
 * GET /api/cars.php           → lista opublikowanych aut
 * GET /api/cars.php?slug=...  → jedno auto albo 404
 *
 * To jedyny endpoint, którego potrzebuje strona React.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib.php';

$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';

if ($slug !== '') {
    $car = find_car($slug, true);
    if ($car === null) {
        json_response(['error' => 'Nie znaleziono samochodu.'], 404);
    }
    json_response($car);
}

json_response(public_cars());
