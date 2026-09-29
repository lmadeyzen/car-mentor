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
        $currentGallery = is_array($existing) && is_array($existing['gallery'] ?? null)
            ? array_map('strval', $existing['gallery'])
            : [];
        $remove = $_POST['remove'] ?? [];
        $remove = is_array($remove) ? array_map('strval', $remove) : [];
        $ordered = $_POST['gallery_order'] ?? [];
        $ordered = is_array($ordered) ? array_map('strval', $ordered) : [];

        $keep = [];
        foreach ($ordered as $url) {
            if ($url === '' || !in_array($url, $currentGallery, true)) {
                continue;
            }
            if (in_array($url, $remove, true) || in_array($url, $keep, true)) {
                continue;
            }
            $keep[] = $url;
        }

        foreach ($currentGallery as $url) {
            if (in_array($url, $remove, true)) {
                delete_gallery_file($url);
                continue;
            }
            if (!in_array($url, $keep, true)) {
                $keep[] = $url;
            }
        }

        $nextSlug = $currentSlug ?: slugify(
            trim((string) ($_POST['slug'] ?? ''))
                ?: (trim((string) ($_POST['brand'] ?? '')) . ' ' . trim((string) ($_POST['model'] ?? '')))
        );
        $uploaded = isset($_FILES['photos']) ? save_uploaded_images($nextSlug, $_FILES['photos']) : [];

        $documentPdf = is_array($existing) ? trim((string) ($existing['documentPdf'] ?? '')) : '';
        if (isset($_POST['remove_document']) && $documentPdf !== '') {
            delete_gallery_file($documentPdf);
            $documentPdf = '';
        }
        $uploadedPdf = isset($_FILES['document']) ? save_uploaded_pdf($nextSlug, $_FILES['document']) : null;
        if ($uploadedPdf !== null) {
            if ($documentPdf !== '') {
                delete_gallery_file($documentPdf);
            }
            $documentPdf = $uploadedPdf;
        }

        $car = car_from_post(
            $_POST,
            array_values(array_merge($keep, $uploaded)),
            $nextSlug,
            $documentPdf
        );

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
        $fallbackGallery = is_array($existing) && is_array($existing['gallery'] ?? null)
            ? $existing['gallery']
            : [];
        $postedOrder = $_POST['gallery_order'] ?? null;
        if (is_array($postedOrder)) {
            $allowed = array_map('strval', $fallbackGallery);
            $rebuild = [];
            foreach ($postedOrder as $url) {
                $url = (string) $url;
                if (in_array($url, $allowed, true) && !in_array($url, $rebuild, true)) {
                    $rebuild[] = $url;
                }
            }
            foreach ($allowed as $url) {
                if (!in_array($url, $rebuild, true)) {
                    $rebuild[] = $url;
                }
            }
            $fallbackGallery = $rebuild;
        }
        $fallbackDocument = is_array($existing)
            ? trim((string) ($existing['documentPdf'] ?? ''))
            : '';
        if (isset($_POST['remove_document'])) {
            $fallbackDocument = '';
        }
        $existing = car_from_post(
            $_POST,
            $fallbackGallery,
            $isEdit && is_array($existing) ? (string) $existing['slug'] : null,
            $fallbackDocument
        );
    }
}

$car = $existing ?? [
    'slug' => '',
    'brand' => '',
    'model' => '',
    'year' => (int) date('Y'),
    'description' => '',
    'detailedDescription' => '',
    'engine' => '',
    'power' => '',
    'mileage' => '',
    'gearbox' => '',
    'fuel' => '',
    'drive' => '',
    'saleForm' => '',
    'originCountry' => '',
    'vin' => '',
    'offerFrom' => '',
    'registeredInPoland' => false,
    'registrationNumber' => '',
    'firstRegistrationDate' => '',
    'firstOwner' => false,
    'history' => '',
    'servicing' => '',
    'price' => '',
    'otomotoUrl' => '',
    'tag' => 'Od ręki',
    'gallery' => [],
    'documentPdf' => '',
    'documentType' => '',
    'published' => true,
];

$detailedHtml = detailed_description_to_html($car['detailedDescription'] ?? '');

admin_header(
    $isEdit ? 'Edytuj auto' : 'Dodaj auto',
    true,
    ['<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" />']
);
?>
  <section class="card">
    <h1><?= $isEdit ? 'Edytuj auto' : 'Dodaj auto' ?></h1>
    <p class="lead">Krótki opis trafia na listę. Pełny opis (rich text) — na kartę pojazdu.</p>
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
          <label for="fuel">Rodzaj paliwa</label>
          <input id="fuel" type="text" name="fuel" value="<?= e((string) ($car['fuel'] ?? '')) ?>" placeholder="np. Diesel, Benzyna, Hybryda" />
        </div>
        <div>
          <label for="drive">Napęd</label>
          <input id="drive" type="text" name="drive" value="<?= e((string) ($car['drive'] ?? '')) ?>" placeholder="np. 4x4, 4Motion, FWD" />
        </div>
        <div>
          <label for="saleForm">Forma sprzedaży</label>
          <?php $saleForm = (string) ($car['saleForm'] ?? ''); ?>
          <select id="saleForm" name="saleForm">
            <option value="" <?= $saleForm === '' ? 'selected' : '' ?>>— wybierz —</option>
            <option value="Faktura VAT" <?= $saleForm === 'Faktura VAT' ? 'selected' : '' ?>>Faktura VAT</option>
            <option value="Faktura VAT 23%" <?= $saleForm === 'Faktura VAT 23%' ? 'selected' : '' ?>>Faktura VAT 23%</option>
            <option value="Faktura VAT marża" <?= $saleForm === 'Faktura VAT marża' ? 'selected' : '' ?>>Faktura VAT marża</option>
            <option value="Umowa kupna-sprzedaży" <?= $saleForm === 'Umowa kupna-sprzedaży' ? 'selected' : '' ?>>Umowa kupna-sprzedaży</option>
          </select>
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

      <h2 class="form-section-title">Informacje dodatkowe</h2>
      <div class="grid-2">
        <div>
          <label for="originCountry">Kraj pochodzenia</label>
          <input id="originCountry" type="text" name="originCountry" value="<?= e((string) ($car['originCountry'] ?? '')) ?>" placeholder="np. Polska" />
        </div>
        <div>
          <label for="vin">VIN</label>
          <input id="vin" type="text" name="vin" value="<?= e((string) ($car['vin'] ?? '')) ?>" placeholder="np. W1NKM0CB0SF356855" />
        </div>
        <div>
          <label for="offerFrom">Oferta od</label>
          <input id="offerFrom" type="text" name="offerFrom" value="<?= e((string) ($car['offerFrom'] ?? '')) ?>" placeholder="np. Firmy, Osoby prywatnej" />
        </div>
        <div>
          <label for="registrationNumber">Numer rejestracyjny</label>
          <input id="registrationNumber" type="text" name="registrationNumber" value="<?= e((string) ($car['registrationNumber'] ?? '')) ?>" placeholder="np. WB701CN" />
        </div>
        <div>
          <label for="firstRegistrationDate">Data pierwszej rejestracji</label>
          <input id="firstRegistrationDate" type="text" name="firstRegistrationDate" value="<?= e((string) ($car['firstRegistrationDate'] ?? '')) ?>" placeholder="np. 07/03/2025" />
        </div>
        <div>
          <label for="history">Historia</label>
          <input id="history" type="text" name="history" value="<?= e((string) ($car['history'] ?? '')) ?>" placeholder="np. Bezwypadkowe" />
        </div>
        <div>
          <label for="servicing">Serwisowanie</label>
          <input id="servicing" type="text" name="servicing" value="<?= e((string) ($car['servicing'] ?? '')) ?>" placeholder="np. Serwisowany w ASO" />
        </div>
      </div>
      <div class="checks-row">
        <label class="check">
          <input type="checkbox" name="registeredInPoland" value="1" <?= !empty($car['registeredInPoland']) ? 'checked' : '' ?> />
          Zarejestrowany w Polsce
        </label>
        <label class="check">
          <input type="checkbox" name="firstOwner" value="1" <?= !empty($car['firstOwner']) ? 'checked' : '' ?> />
          Pierwszy właściciel (od nowości)
        </label>
      </div>

      <label for="description">Krótki opis na liście</label>
      <textarea id="description" name="description"><?= e((string) $car['description']) ?></textarea>

      <label for="detailedDescriptionEditor">Opis na karcie auta</label>
      <input type="hidden" id="detailedDescription" name="detailedDescription" value="<?= e($detailedHtml) ?>" />
      <div id="detailedDescriptionEditor" class="rich-editor"><?= $detailedHtml ?></div>
      <p class="hint" style="margin-top: 8px">Pogrubienie, listy, nagłówki i linki. Wygląd na karcie odpowiada temu, co widzisz w edytorze.</p>

      <label>Zdjęcia</label>
      <?php if (!empty($car['gallery'])): ?>
        <p class="hint" style="margin-top: 0">Przeciągnij zdjęcia lub użyj strzałek, żeby ustawić kolejność. Pierwsze jest okładką.</p>
        <div class="gallery" id="gallery-sortable">
          <?php foreach ($car['gallery'] as $index => $photo): ?>
            <?php $photoUrl = (string) $photo; ?>
            <div class="photo" draggable="true" data-url="<?= e($photoUrl) ?>">
              <input type="hidden" name="gallery_order[]" value="<?= e($photoUrl) ?>" />
              <div class="photo-drag" aria-hidden="true">⋮⋮</div>
              <img src="<?= e($photoUrl) ?>" alt="" />
              <span class="cover-badge<?= $index === 0 ? ' is-visible' : '' ?>">Okładka</span>
              <div class="photo-actions">
                <button type="button" class="btn secondary photo-move" data-move="-1" aria-label="Przesuń w lewo">←</button>
                <button type="button" class="btn secondary photo-move" data-move="1" aria-label="Przesuń w prawo">→</button>
              </div>
              <label class="check photo-remove">
                <input type="checkbox" name="remove[]" value="<?= e($photoUrl) ?>" />
                Usuń
              </label>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
      <input type="file" name="photos[]" accept="image/jpeg,image/png,image/webp" multiple />
      <p class="hint">JPG / PNG / WebP, max 8 MB na plik. Nowe zdjęcia trafiają na koniec galerii.</p>

      <h2 class="form-section-title">Załącznik PDF</h2>
      <p class="hint" style="margin-top: 0">Opcjonalnie — historia serwisowa albo raport CarVertical. Na stronie pojawi się przycisk pobierania tylko gdy plik jest dodany.</p>
      <div class="grid-2">
        <div>
          <label for="documentType">Rodzaj dokumentu</label>
          <?php $documentType = (string) ($car['documentType'] ?? ''); ?>
          <select id="documentType" name="documentType">
            <option value="service-history" <?= $documentType === 'service-history' || $documentType === '' ? 'selected' : '' ?>>Historia serwisowa</option>
            <option value="car-vertical" <?= $documentType === 'car-vertical' ? 'selected' : '' ?>>CarVertical</option>
          </select>
        </div>
        <div>
          <label for="document">Plik PDF</label>
          <input id="document" type="file" name="document" accept="application/pdf,.pdf" />
        </div>
      </div>
      <?php
        $documentPdf = trim((string) ($car['documentPdf'] ?? ''));
      ?>
      <?php if ($documentPdf !== ''): ?>
        <div class="document-current">
          <a href="<?= e($documentPdf) ?>" target="_blank" rel="noopener noreferrer">Aktualny plik PDF</a>
          <label class="check" style="margin-top: 0">
            <input type="checkbox" name="remove_document" value="1" />
            Usuń załącznik
          </label>
        </div>
      <?php endif; ?>
      <p class="hint">Tylko PDF, max 15 MB. Nowy upload zastępuje poprzedni plik.</p>

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
  <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>
  <script>
    (function () {
      var editorEl = document.getElementById('detailedDescriptionEditor');
      var hidden = document.getElementById('detailedDescription');
      var form = editorEl ? editorEl.closest('form') : null;
      if (editorEl && hidden && typeof Quill !== 'undefined') {
        var quill = new Quill(editorEl, {
          theme: 'snow',
          placeholder: 'Opisz pojazd…',
          modules: {
            toolbar: [
              [{ header: [2, 3, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'],
              ['clean']
            ]
          }
        });

        function syncDescription() {
          var html = quill.root.innerHTML;
          if (html === '<p><br></p>' || html === '<p></p>') html = '';
          hidden.value = html;
        }

        quill.on('text-change', syncDescription);
        if (form) {
          form.addEventListener('submit', syncDescription);
        }
        syncDescription();
      }

      var gallery = document.getElementById('gallery-sortable');
      if (!gallery) return;

      var dragEl = null;

      function refreshCoverBadges() {
        var photos = gallery.querySelectorAll('.photo');
        photos.forEach(function (photo, index) {
          var badge = photo.querySelector('.cover-badge');
          if (badge) badge.classList.toggle('is-visible', index === 0);
        });
      }

      function movePhoto(photo, delta) {
        if (delta < 0 && photo.previousElementSibling) {
          gallery.insertBefore(photo, photo.previousElementSibling);
        } else if (delta > 0 && photo.nextElementSibling) {
          gallery.insertBefore(photo.nextElementSibling, photo);
        }
        refreshCoverBadges();
      }

      gallery.addEventListener('click', function (event) {
        var button = event.target.closest('.photo-move');
        if (!button || !gallery.contains(button)) return;
        var photo = button.closest('.photo');
        if (!photo) return;
        movePhoto(photo, Number(button.getAttribute('data-move')) || 0);
      });

      gallery.addEventListener('dragstart', function (event) {
        if (event.target.closest('button, input, label, a')) {
          event.preventDefault();
          return;
        }
        var photo = event.target.closest('.photo');
        if (!photo || !gallery.contains(photo)) return;
        dragEl = photo;
        photo.classList.add('is-dragging');
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setData('text/plain', photo.getAttribute('data-url') || '');
        }
      });

      gallery.addEventListener('dragend', function () {
        if (dragEl) dragEl.classList.remove('is-dragging');
        dragEl = null;
        gallery.querySelectorAll('.photo.is-drop-target').forEach(function (el) {
          el.classList.remove('is-drop-target');
        });
        refreshCoverBadges();
      });

      gallery.addEventListener('dragover', function (event) {
        if (!dragEl) return;
        event.preventDefault();
        var target = event.target.closest('.photo');
        if (!target || target === dragEl || !gallery.contains(target)) return;
        gallery.querySelectorAll('.photo.is-drop-target').forEach(function (el) {
          if (el !== target) el.classList.remove('is-drop-target');
        });
        target.classList.add('is-drop-target');
        var rect = target.getBoundingClientRect();
        var before = event.clientX < rect.left + rect.width / 2;
        if (before) {
          gallery.insertBefore(dragEl, target);
        } else {
          gallery.insertBefore(dragEl, target.nextElementSibling);
        }
      });

      gallery.addEventListener('drop', function (event) {
        event.preventDefault();
        refreshCoverBadges();
      });
    })();
  </script>
<?php
admin_footer();
