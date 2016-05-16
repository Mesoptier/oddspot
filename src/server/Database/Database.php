<?php
namespace OddSpot\Database;

use OddSpot\Database\Entity\Question;
use OddSpot\Database\Entity\QuestionChoice;
use OddSpot\Database\Entity\Questionnaire;
use Spot\MapperInterface;

/**
 * Class Database
 * @package OddSpot
 */
class Database {

  /* @var MapperInterface */
  protected static $questionnaireMapper;

  /* @var MapperInterface */
  protected static $questionMapper;

  /* @var MapperInterface */
  protected static $questionChoiceMapper;

  /**
   * @param $dsn string|array
   * @throws \Spot\Exception
   */
  public static function configure($dsn) {
    // Configure database
    $config = new \Spot\Config();
    $config->addConnection('main', $dsn);
    $spot = new \Spot\Locator($config);

    // Get mappers
    self::$questionnaireMapper = $spot->mapper(Questionnaire::class);
    self::$questionMapper = $spot->mapper(Question::class);
    self::$questionChoiceMapper = $spot->mapper(QuestionChoice::class);
  }

  public static function migrate() {
    self::$questionnaireMapper->migrate();
    self::$questionMapper->migrate();
    self::$questionChoiceMapper->migrate();
  }

  public static function seed() {
//    $questionnaire = self::$questionnaireMapper->create([
//      'name' => 'OddSpot',
//    ]);
  }

}
