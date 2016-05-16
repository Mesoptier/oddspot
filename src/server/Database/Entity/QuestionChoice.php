<?php
namespace OddSpot\Database\Entity;

use Spot\Entity;
use Spot\EntityInterface;
use Spot\MapperInterface;

class QuestionChoice extends Entity {

  protected static $table = 'question_choices';
  
  public static function fields() {
    return [
      'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
      'question_id' => ['type' => 'integer', 'required' => true],
      'label' => ['type' => 'string', 'required' => true],
      'value' => ['type' => 'integer', 'required' => true],
    ];
  }

  public static function relations(MapperInterface $mapper, EntityInterface $entity) {
    return [
      'question' => $mapper->belongsTo($entity, Question::class, 'question_id'),
    ];
  }

}
