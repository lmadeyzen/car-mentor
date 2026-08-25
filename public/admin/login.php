<?php
declare(strict_types=1);

require_once __DIR__ . '/_boot.php';
require_once __DIR__ . '/_layout.php';

if (!has_password()) {
    redirect('/admin/setup.php');
}

if (!empty($_SESSION['admin'])) {
    redirect('/admin/index.php');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();
    if (verify_password((string) ($_POST['password'] ?? ''))) {
        $_SESSION['admin'] = true;
        redirect('/admin/index.php');
    }
    $error = 'Nieprawidłowe hasło.';
}

admin_header('Logowanie', false);
?>
  <section class="card">
    <h1>Logowanie</h1>
    <p class="lead">Panel do wrzucania samochodów. Publiczna strona tego nie widzi.</p>
    <?php if ($error !== ''): ?>
      <p class="flash"><?= e($error) ?></p>
    <?php endif; ?>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>" />
      <label for="password">Hasło</label>
      <input id="password" type="password" name="password" required />
      <p class="row" style="margin-top: 18px">
        <button class="btn" type="submit">Zaloguj</button>
      </p>
    </form>
  </section>
<?php
admin_footer();
