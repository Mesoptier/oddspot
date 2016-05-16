<?php
namespace OddSpot\Database\Entity;

use Spot\Entity;
use Spot\EntityInterface;
use Spot\MapperInterface;

class Question extends Entity {

  protected static $table = 'questions';

  public static function fields() {
    return [
      'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
      'questionnaire_id' => ['type' => 'integer', 'required' => true],
      'question' => ['type' => 'text', 'required' => true],
      'description' => ['type' => 'text'],
    ];
  }

  public static function relations(MapperInterface $mapper, EntityInterface $entity) {
    return [
      'questionnaire' => $mapper->belongsTo($entity, Questionnaire::class, 'questionnaire_id'),
      'choices' => $mapper->hasMany($entity, QuestionChoice::class, 'question_id'),
    ];
  }

}
