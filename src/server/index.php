<?php
namespace OddSpot;

use OddSpot\Database\Database;
use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Zeuxisoo\Whoops\Provider\Slim\WhoopsMiddleware;

require_once(__DIR__ . '/config.php');

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

// Fancy error screen
$app->add(new WhoopsMiddleware());

// Authentication
$app->add(new \Slim\Middleware\HttpBasicAuthentication([
  'path' => '/admin',
  'realm' => 'Admin',
  'secure' => false, // We're not using HTTPS :(
  'users' => include(DATA_DIRECTORY . '/users.local.php'),
]));

// Remove trailing slash
$app->add(function (Request $request, Response $response, callable $next) {
  $uri = $request->getUri();
  $path = $uri->getPath();
  if ($path != '/' && substr($path, -1) == '/') {
    // Permanently redirect paths with a trailing slash
    // to their non-trailing counterpart
    $uri = $uri->withPath(substr($path, 0, -1));
    return $response->withRedirect((string)$uri, 301);
  }

  return $next($request, $response);
});

// Admin routes
$app->group('/admin', function () {
  $this->get('/api/questionnaire', function (Request $request, Response $response) {
    return $response->withJson(Database::getAdminData());
  });

  $this->post('/api/questionnaire/save', function (Request $request, Response $response) {
    $data = $request->getParsedBody();
    return $response->withJson(Database::saveAdminData($data['changes']));
  });

  $this->get('[/{path:.*}]', function (Request $request, Response $response) {
    $this->view->render($response, 'admin.twig', [
      'initialData' => Database::getAdminData(),
    ]);
  });
});

// Client route
$app->get('[/{path:.*}]', function (Request $request, Response $response) {
  $this->view->render($response, 'client.twig', [
    'initialData' => Database::getClientInitialData(),
  ]);
});

$app->run();
