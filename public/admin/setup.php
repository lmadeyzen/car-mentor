<?php
declare(strict_types=1);

require_once __DIR__ . '/_boot.php';
require_once __DIR__ . '/_layout.php';

if (has_password()) {
    redirect('/admin/login.php');
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_csrf();
    $password = (string) ($_POST['password'] ?? '');
    $repeat = (string) ($_POST['repeat'] ?? '');

    try {
        if ($password !== $repeat) {
            throw new InvalidArgumentException('Hasła nie są takie same.');
        }
        set_password($password);
        $_SESSION['admin'] = true;
        redirect('/admin/index.php');
    } catch (Throwable $exception) {
        $error = $exception->getMessage();
    }
}

admin_header('Ustaw hasło', false);
?>
  <section class="card">
    <h1>Pierwsze uruchomienie</h1>
    <p class="lead">Ustaw hasło do panelu. Zostanie zapisane jako hash w <code>api/data/auth.json</code> — nie w czystym tekście.</p>
    <?php if ($error !== ''): ?>
      <p class="flash"><?= e($error) ?></p>
    <?php endif; ?>
    <form method="post">
      <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>" />
      <label for="password">Hasło (min. 8 znaków)</label>
      <input id="password" type="password" name="password" required minlength="8" />
      <label for="repeat">Powtórz hasło</label>
      <input id="repeat" type="password" name="repeat" required minlength="8" />
      <p class="row" style="margin-top: 18px">
        <button class="btn" type="submit">Zapisz i wejdź</button>
      </p>
    </form>
  </section>
<?php
admin_footer();
