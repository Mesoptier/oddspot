<?php

define('SERVER_ENV', getenv('SERVER_ENV'));

if (SERVER_ENV == 'production') {
  define('ASSETS_BASE', '/assets/build');
} else {
  define('ASSETS_BASE', 'http://localhost:8080');
}

require('views/client.phtml');
