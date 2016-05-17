<?php
namespace OddSpot;

use ConsoleKit\Console;
use OddSpot\Command\DatabaseCommand;

require_once(__DIR__ . '/config.php');

$console = new Console();
$console->addCommand(DatabaseCommand::class);

$console->run();
