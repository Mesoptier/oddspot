<?php
namespace OddSpot\Database;

use Doctrine\DBAL\Connection;
use OddSpot\Database\Entity\Question;
use OddSpot\Database\Entity\QuestionChoice;
use OddSpot\Database\Entity\Questionnaire;
use OddSpot\Database\Entity\Weights;
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

  /* @var MapperInterface */
  public static $weights;

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
    self::$weights = $spot->mapper(Weights::class);
  }

  public static function migrate() {
    self::$questionnaires->migrate();
    self::$questions->migrate();
    self::$question_choices->migrate();
    self::$weights->migrate();
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

  public static function getQuestionnaire() {
    $questionnaire = self::$questionnaires->all()
      ->with(['questions', 'constants'])
      ->where(['id' => 1])
      ->first();

    $data = [
      'questionnaire' => [
        'global_function' => 'sqrt(x)',
        'constants' => [
          'ak' => $questionnaire->constants->ak,
          'bcc' => $questionnaire->constants->bcc,
        ],
        'questions' => [],
      ],
    ];

    foreach ($questionnaire->questions as $i => $question) {
      $data['questionnaire']['questions'][$question->id] = [
        'order' => $question->order,
        'type' => $question->type,
        'weights' => [
          'ak' => $question->weights->ak,
          'bcc' => $question->weights->bcc,
        ],
        'question' => $question->question,
        'description' => $question->description,
        'choices' => [],
        'settings' => [
          'min' => $question->max,
          'max' => $question->min,
          'fnc' => $question->fnc,
        ],
      ];

      foreach ($question->choices as $choice) {
        $data['questionnaire']['questions'][$question->id]['choices'][$choice->id] = [
          'label' => $choice->label,
          'value' => $choice->value,
          'order' => $choice->order,
        ];
      }
    }

    return $data;
  }

  public static function getAdminData() {
    return self::getQuestionnaire();
  }

  public static function getClientInitialData() {
    return self::getQuestionnaire();
  }

}
