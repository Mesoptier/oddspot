<?php
namespace OddSpot\Database\Entity;

use Spot\Entity;
use Spot\EntityInterface;
use Spot\MapperInterface;

class Questionnaire extends Entity {

  protected static $table = 'questionnaires';

  public static function fields() {
    return [
      'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
      'name' => ['type' => 'string', 'required' => true],
    ];
  }

  public static function relations(MapperInterface $mapper, EntityInterface $entity) {
    return [
      'questions' => $mapper->hasMany($entity, Question::class, 'questionnaire_id'),
    ];
  }

}

