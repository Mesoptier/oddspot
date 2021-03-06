<?php
namespace OddSpot;

use OddSpot\Database\Database;

// Get server environment (development | production)
define('SERVER_ENV', getenv('SERVER_ENV') ?: 'production');

define('ROOT_DIRECTORY', __DIR__ . '/../..');
define('DATA_DIRECTORY', ROOT_DIRECTORY . '/data');

Database::configure([
  'driver' => 'pdo_sqlite',
  'dbname' => 'oddspot',
  'path' => DATA_DIRECTORY . '/database/database.sqlite',
]);

// Configure server for different environments
if (SERVER_ENV == 'production') {
    if (isset($_SERVER['HTTP_HOST']) && stripos($_SERVER['HTTP_HOST'], 'chrissnijders.com') !== false) {
        define('ASSETS_BASE', '/oddspot/assets/build');
    } else {
        define('ASSETS_BASE', '/assets/build');
    }
} else {
  $host = gethostbyname(gethostname());
  define('ASSETS_BASE', 'http://' . $host . ':8080');
}
