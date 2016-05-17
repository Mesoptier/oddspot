<?php
namespace OddSpot;

use OddSpot\Database\Database;

// Get server environment (development | production)
define('SERVER_ENV', getenv('SERVER_ENV'));

define('ROOT_DIRECTORY', __DIR__ . '/../..');
define('DATA_DIRECTORY', ROOT_DIRECTORY . '/data');

Database::configure([
  'driver' => 'pdo_sqlite',
  'dbname' => 'oddspot',
  'path' => DATA_DIRECTORY . '/database/database.sqlite',
]);

// Configure server for different environments
if (SERVER_ENV == 'production') {
  define('ASSETS_BASE', '/assets/build');
} else {
  $host = gethostbyname(gethostname());
  define('ASSETS_BASE', 'http://' . $host . ':8080');
}
