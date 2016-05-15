<?php

// Get server environment (development | production)
define('SERVER_ENV', getenv('SERVER_ENV'));

// Configure server for different environments
if (SERVER_ENV == 'production') {
  define('ASSETS_BASE', '/assets/build');
} else {
  $host = gethostbyname(gethostname());
  define('ASSETS_BASE', 'http://' . $host . ':8080');
}

// Load appropriate view
if (preg_match('/^\/admin/', $_SERVER['PATH_INFO'])) {
  require(__DIR__ . '/views/admin.phtml');
} else {
  require(__DIR__ . '/views/client.phtml');
}
