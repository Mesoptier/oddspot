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
      'weight_id' => ['type' => 'integer', 'required' => false, 'value' => null],
      'type' => ['type' => 'string', 'required' => true, 'value' => 'none'],
      'order' => ['type' => 'integer', 'required' => true, 'value' => 0],
      'question' => ['type' => 'text'],
      'description' => ['type' => 'text'],
      'min' => ['type' => 'integer'],
      'max' => ['type' => 'integer'],
      'fnc' => ['type' => 'string'],
    ];
  }

  public static function relations(MapperInterface $mapper, EntityInterface $entity) {
    return [
      'questionnaire' => $mapper->belongsTo($entity, Questionnaire::class, 'questionnaire_id'),
      'choices' => $mapper->hasMany($entity, QuestionChoice::class, 'question_id'),
      'weight' => $mapper->belongsTo($entity, Weight::class, 'weight_id'),
    ];
  }

}
