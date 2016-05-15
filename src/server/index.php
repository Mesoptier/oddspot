<?php

namespace OddSpot;

// Get server environment (development | production)
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Zeuxisoo\Whoops\Provider\Slim\WhoopsMiddleware;

define('SERVER_ENV', getenv('SERVER_ENV'));

define('ROOT_DIRECTORY', __DIR__ . '/../..');
define('DATA_DIRECTORY', ROOT_DIRECTORY . '/data');

Database::init(DATA_DIRECTORY . '/database');

// Configure server for different environments
if (SERVER_ENV == 'production') {
  define('ASSETS_BASE', '/assets/build');
} else {
  $host = gethostbyname(gethostname());
  define('ASSETS_BASE', 'http://' . $host . ':8080');
}

// Initialize app
$app = new App([
  'settings' => [
    'debug' => true,
  ],
]);
$container = $app->getContainer();

$container['view'] = function ($container) {
  $view = new \Slim\Views\Twig(__DIR__ . '/views', [
    DATA_DIRECTORY . '/cache/twig',
  ]);

  // Default variables
  $view['assetsBase'] = ASSETS_BASE;

  return $view;
};

// Force trailing slash
//$app->add(function (Request $request, Response $response, callable $next) {
//  $uri = $request->getUri();
//  $path = $uri->getPath();
//  if ($path != '/' && substr($path, -1) == '/') {
//    // Permanently redirect paths with a trailing slash
//    // to their non-trailing counterpart
//    $uri = $uri->withPath(substr($path, 0, -1));
//    return $response->withRedirect((string)$uri, 301);
//  }
//
//  return $next($request, $response);
//});

// Fancy error screen
$app->add(new WhoopsMiddleware());

// Admin routes
$app->group('/admin', function () {

  // TODO: Add authentication

  $this->get('[/{path:.*}]', function (Request $request, Response $response) {
    $this->view->render($response, 'admin.twig', [
      'initialState' => [],
    ]);
  });
});

// Client route
$app->get('[/{path:.*}]', function (Request $request, Response $response) {
  $this->view->render($response, 'client.twig', [
    'initialState' => Database::getClientInitialState(),
  ]);
});

$app->run();
