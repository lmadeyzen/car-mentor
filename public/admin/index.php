<?php
declare(strict_types=1);

require_once __DIR__ . '/_init.php';
require_once __DIR__ . '/_layout.php';

$cars = load_cars();
$saved = isset($_GET['saved']);

admin_header('Lista aut');
?>
  <section class="card">
    <div class="row" style="justify-content: space-between; margin-bottom: 12px">
      <div>
        <h1>Samochody</h1>
        <p class="lead">To jest zawartość pliku <code>api/data/cars.json</code>. Edycja tutaj = zmiana na stronie.</p>
      </div>
      <a class="btn" href="/admin/edit.php">Dodaj auto</a>
    </div>
    <?php if ($saved): ?>
      <p class="flash ok">Zapisane.</p>
    <?php endif; ?>
    <?php if ($cars === []): ?>
      <p class="muted">Nie ma jeszcze żadnego auta.</p>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Zdjęcie</th>
            <th>Auto</th>
            <th>Cena</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($cars as $car): ?>
            <?php
            $slug = (string) ($car['slug'] ?? '');
            $cover = (string) (($car['gallery'][0] ?? ''));
            ?>
            <tr>
              <td>
                <?php if ($cover !== ''): ?>
                  <img class="thumb" src="<?= e($cover) ?>" alt="" />
                <?php endif; ?>
              </td>
              <td>
                <strong><?= e(car_title($car)) ?></strong><br />
                <span class="muted"><?= e((string) ($car['year'] ?? '')) ?> · <?= e($slug) ?></span>
              </td>
              <td><?= e((string) ($car['price'] ?? '')) ?></td>
              <td><?= !empty($car['published']) ? 'Opublikowane' : 'Szkic' ?></td>
              <td>
                <div class="row">
                  <a class="btn secondary" href="/admin/edit.php?slug=<?= e(urlencode($slug)) ?>">Edytuj</a>
                  <form method="post" action="/admin/delete.php" onsubmit="return confirm('Usunąć to auto?');">
                    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>" />
                    <input type="hidden" name="slug" value="<?= e($slug) ?>" />
                    <button class="btn danger" type="submit">Usuń</button>
                  </form>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
    <p class="hint">
      Na home.pl wgraj zawartość folderu <code>dist/</code> do <code>public_html</code>.
      Przy kolejnych wrzutkach nie nadpisuj <code>api/data/</code> ani <code>uploads/</code> — tam żyją ogłoszenia i zdjęcia.
    </p>
  </section>
<?php
admin_footer();
