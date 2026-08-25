<?php
declare(strict_types=1);

require_once __DIR__ . '/_init.php';
require_once __DIR__ . '/_layout.php';

$slug = trim((string) ($_GET['slug'] ?? ''));
$existing = $slug !== '' ? find_car($slug) : null;
$isEdit = $existing !== null;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();

    try {
        $currentSlug = $isEdit ? (string) $existing['slug'] : null;
        $keep = [];
        $currentGallery = is_array($existing) && is_array($existing['gallery'] ?? null)
            ? $existing['gallery']
            : [];
        $remove = $_POST['remove'] ?? [];
        $remove = is_array($remove) ? $remove : [];

        foreach ($currentGallery as $url) {
            $url = (string) $url;
            if (in_array($url, $remove, true)) {
                delete_gallery_file($url);
                continue;
            }
            $keep[] = $url;
        }

        $nextSlug = $currentSlug ?: slugify(
            trim((string) ($_POST['slug'] ?? ''))
                ?: (trim((string) ($_POST['brand'] ?? '')) . ' ' . trim((string) ($_POST['model'] ?? '')))
        );
        $uploaded = isset($_FILES['photos']) ? save_uploaded_images($nextSlug, $_FILES['photos']) : [];
        $car = car_from_post($_POST, array_values(array_merge($keep, $uploaded)), $nextSlug);

        if ($car['brand'] === '' || $car['model'] === '') {
            throw new InvalidArgumentException('Marka i model są wymagane.');
        }

        if (!$isEdit && find_car($car['slug']) !== null) {
            throw new InvalidArgumentException('Auto z takim slugiem już istnieje.');
        }

        upsert_car($car);
        redirect('/admin/index.php?saved=1');
    } catch (Throwable $exception) {
        $error = $exception->getMessage();
        $existing = car_from_post(
            $_POST,
            is_array($existing) && is_array($existing['gallery'] ?? null) ? $existing['gallery'] : [],
            $isEdit ? (string) $existing['slug'] : null
        );
    }
}

$car = $existing ?? [
    'slug' => '',
    'brand' => '',
    'model' => '',
    'year' => (int) date('Y'),
    'description' => '',
    'detailedDescription' => [],
    'equipmentSections' => [['title' => '', 'items' => []]],
    'engine' => '',
    'power' => '',
    'mileage' => '',
    'gearbox' => '',
    'price' => '',
    'otomotoUrl' => '',
    'tag' => 'Od ręki',
    'gallery' => [],
    'published' => true,
];

$sections = $car['equipmentSections'] ?? [];
if ($sections === []) {
    $sections = [['title' => '', 'items' => []]];
}

admin_header($isEdit ? 'Edytuj auto' : 'Dodaj auto');
?>
  <section class="card">
    <h1><?= $isEdit ? 'Edytuj auto' : 'Dodaj auto' ?></h1>
    <p class="lead">Akapity opisu oddziel pustą linią. W wyposażeniu: jedna cecha = jedna linia.</p>
    <?php if ($error !== ''): ?>
      <p class="flash"><?= e($error) ?></p>
    <?php endif; ?>
    <form method="post" enctype="multipart/form-data">
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>" />

      <div class="grid-2">
        <div>
          <label for="brand">Marka</label>
          <input id="brand" type="text" name="brand" required value="<?= e((string) $car['brand']) ?>" />
        </div>
        <div>
          <label for="model">Model</label>
          <input id="model" type="text" name="model" required value="<?= e((string) $car['model']) ?>" />
        </div>
        <div>
          <label for="year">Rok</label>
          <input id="year" type="number" name="year" min="1980" max="2100" value="<?= e((string) $car['year']) ?>" />
        </div>
        <div>
          <label for="tag">Tag</label>
          <select id="tag" name="tag">
            <option value="Od ręki" <?= ($car['tag'] ?? '') === 'Od ręki' ? 'selected' : '' ?>>Od ręki</option>
            <option value="Sprawdzone" <?= ($car['tag'] ?? '') === 'Sprawdzone' ? 'selected' : '' ?>>Sprawdzone</option>
          </select>
        </div>
        <div>
          <label for="price">Cena</label>
          <input id="price" type="text" name="price" value="<?= e((string) $car['price']) ?>" />
        </div>
        <div>
          <label for="mileage">Przebieg</label>
          <input id="mileage" type="text" name="mileage" value="<?= e((string) $car['mileage']) ?>" />
        </div>
        <div>
          <label for="engine">Silnik</label>
          <input id="engine" type="text" name="engine" value="<?= e((string) $car['engine']) ?>" />
        </div>
        <div>
          <label for="power">Moc</label>
          <input id="power" type="text" name="power" value="<?= e((string) $car['power']) ?>" />
        </div>
        <div>
          <label for="gearbox">Skrzynia</label>
          <input id="gearbox" type="text" name="gearbox" value="<?= e((string) $car['gearbox']) ?>" />
        </div>
        <div>
          <label for="otomotoUrl">Link Otomoto</label>
          <input id="otomotoUrl" type="url" name="otomotoUrl" value="<?= e((string) $car['otomotoUrl']) ?>" />
        </div>
      </div>

      <?php if (!$isEdit): ?>
        <label for="slug">Slug w adresie (puste = z marki i modelu)</label>
        <input id="slug" type="text" name="slug" value="<?= e((string) $car['slug']) ?>" placeholder="wygeneruje-sie-sam" />
      <?php endif; ?>

      <label for="description">Krótki opis na liście</label>
      <textarea id="description" name="description"><?= e((string) $car['description']) ?></textarea>

      <label for="detailedDescription">Opis na karcie auta</label>
      <textarea id="detailedDescription" name="detailedDescription" style="min-height: 160px"><?= e(implode("\n\n", $car['detailedDescription'] ?? [])) ?></textarea>

      <label>Wyposażenie</label>
      <div id="sections">
        <?php foreach ($sections as $section): ?>
          <div class="section-box">
            <input type="text" name="equipment_title[]" placeholder="Nazwa sekcji, np. Bezpieczeństwo" value="<?= e((string) ($section['title'] ?? '')) ?>" />
            <textarea name="equipment_items[]" placeholder="Jedna linia = jedna pozycja"><?= e(implode("\n", $section['items'] ?? [])) ?></textarea>
          </div>
        <?php endforeach; ?>
      </div>
      <p><button class="btn secondary" type="button" id="add-section">Dodaj sekcję wyposażenia</button></p>

      <label>Zdjęcia</label>
      <?php if (!empty($car['gallery'])): ?>
        <div class="gallery">
          <?php foreach ($car['gallery'] as $photo): ?>
            <label class="photo">
              <img src="<?= e((string) $photo) ?>" alt="" />
              <span class="check"><input type="checkbox" name="remove[]" value="<?= e((string) $photo) ?>" /> Usuń</span>
            </label>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
      <input type="file" name="photos[]" accept="image/jpeg,image/png,image/webp" multiple />
      <p class="hint">JPG / PNG / WebP, max 8 MB na plik.</p>

      <label class="check">
        <input type="checkbox" name="published" value="1" <?= !empty($car['published']) ? 'checked' : '' ?> />
        Opublikowane na stronie
      </label>

      <p class="row" style="margin-top: 20px">
        <button class="btn" type="submit">Zapisz</button>
        <a class="btn secondary" href="/admin/index.php">Anuluj</a>
      </p>
    </form>
  </section>
  <script>
    document.getElementById("add-section").addEventListener("click", function () {
      const box = document.createElement("div");
      box.className = "section-box";
      box.innerHTML =
        '<input type="text" name="equipment_title[]" placeholder="Nazwa sekcji" />' +
        '<textarea name="equipment_items[]" placeholder="Jedna linia = jedna pozycja"></textarea>';
      document.getElementById("sections").appendChild(box);
    });
  </script>
<?php
admin_footer();
