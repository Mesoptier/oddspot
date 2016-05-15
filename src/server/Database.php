<?php

namespace OddSpot;

class Database {

  private static $path;

  public static function init($path) {
    self::$path = $path;
  }

  public static function getQuestionnaireConfig() {
    return [
      'weight' => [
        'ak' => -3.294,
        'bcc' => -13.160,
      ],
    ];
  }

  public static function getQuestions() {

  }

  public static function getClientInitialState() {

  }

}
