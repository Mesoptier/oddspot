<?php
namespace OddSpot\Database;

use Doctrine\DBAL\Connection;
use OddSpot\Database\Entity\Question;
use OddSpot\Database\Entity\QuestionChoice;
use OddSpot\Database\Entity\Questionnaire;
use Spot\MapperInterface;

/**
 * Class Database
 * @package OddSpot
 */
class Database {

  /** @var Connection */
  private static $connection;

  /* @var MapperInterface */
  public static $questionnaires;

  /* @var MapperInterface */
  public static $questions;

  /* @var MapperInterface */
  public static $question_choices;

  /**
   * @param $dsn string|array
   * @throws \Spot\Exception
   */
  public static function configure($dsn) {
    // Configure database
    $config = new \Spot\Config();
    self::$connection = $config->addConnection('main', $dsn);
    $spot = new \Spot\Locator($config);

    // Get mappers
    self::$questionnaires = $spot->mapper(Questionnaire::class);
    self::$questions = $spot->mapper(Question::class);
    self::$question_choices = $spot->mapper(QuestionChoice::class);
  }

  public static function migrate() {
    self::$questionnaires->migrate();
    self::$questions->migrate();
    self::$question_choices->migrate();
  }

  /**
   * Removes the database.
   */
  public static function removeDatabase() {
    self::$connection->close();
    unlink(DATA_DIRECTORY . '/database/database.sqlite');
  }

  /**
   * Rebuilds the database;
   */
  public static function rebuild() {
    self::removeDatabase();
    self::$connection->connect();
    self::migrate();
  }

  public static function getClientInitialData() {
    $questionnaire = self::$questionnaires->all()
      ->with(['questions'])
      ->where(['id' => 1])
      ->first();

    $state = [
      'questionnaire' => [
        'questions' => [],
      ],
    ];

    foreach ($questionnaire->questions as $i => $question) {
      $state['questionnaire']['questions'][$i] = [
        'question' => $question->question,
        'description' => $question->description,
        'choices' => [],
      ];

      foreach ($question->choices as $choice) {
        $state['questionnaire']['questions'][$i]['choices'][] = [
          'label' => $choice->label,
          'value' => $choice->value,
        ];
      }
    }

    return $state;
  }

}
