<?php
declare(strict_types=1);

function admin_header(string $title, bool $nav = true): void
{
    ?>
    <!DOCTYPE html>
    <html lang="pl">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><?= e($title) ?> · CarMentor admin</title>
        <link rel="stylesheet" href="/admin/styles.css" />
      </head>
      <body>
        <div class="wrap">
          <header class="top">
            <a class="brand" href="/admin/index.php">CarMentor admin</a>
            <?php if ($nav): ?>
              <nav>
                <a href="/admin/index.php">Lista aut</a>
                <a href="/admin/edit.php">Dodaj auto</a>
                <a href="/" target="_blank" rel="noreferrer">Strona publiczna</a>
                <a href="/admin/logout.php">Wyloguj</a>
              </nav>
            <?php endif; ?>
          </header>
    <?php
}

function admin_footer(): void
{
    ?>
        </div>
      </body>
    </html>
    <?php
}
