<?php
namespace OddSpot\Command;

use ConsoleKit\Command;
use OddSpot\Database\Database;

function randomFloat($min, $max) {
  return (rand() / getrandmax() * ($max - $min) + $min);
}

class DatabaseCommand extends Command {

  public function execute(array $args, array $options = array()) {
    $action = array_shift($args);
    call_user_func([__CLASS__, $action], $args);
  }

  private function remove() {
    Database::removeDatabase();
  }

  private function migrate() {
    Database::migrate();
  }

  private function seed() {
    Database::rebuild();

    $weight = Database::$weights->create([
      'ak' => -3.294,
      'bcc' => -13.16
    ]);

    $questionnaire = Database::$questionnaires->create([
      'name' => 'OddSpot',
      'weight_id' => $weight->id,
    ]);

    $questions = [
      [
        'order' => 0,
        'type' => 'multiple choice',
        'weight' => ['ak' => randomFloat(-3, 3), 'bcc' => randomFloat(-3, 3)],
        'question' => 'Are you male or female?',
        'choices' => [
          [ 'label' => 'Male', 'value' => 0 ],
          [ 'label' => 'Female', 'value' => 1 ],
        ],
      ],
      [
        'order' => 1,
        'type' => 'multiple choice',
        'weight' => ['ak' => randomFloat(-3, 3), 'bcc' => randomFloat(-3, 3)],
        'question' => 'Have you, during your leisure time and before the age of 65, frequently been exposed to sunlight?',
        'choices' => [
          [ 'label' => 'Yes', 'value' => 0 ],
          [ 'label' => 'No', 'value' => 1 ],
          [ 'label' => 'Don\'t know', 'value' => 2 ],
        ],
      ],
      [
        'order' => 2,
        'type' => 'multiple choice',
        'weight' => ['ak' => randomFloat(-3, 3), 'bcc' => randomFloat(-3, 3)],
        'question' => 'Have you frequently been on a sun-vacation?',
        'description' => '(to tan)',
        'choices' => [
          [ 'label' => 'Often', 'value' => 0 ],
          [ 'label' => 'Regularly', 'value' => 1 ],
          [ 'label' => 'Sometimes', 'value' => 2 ],
          [ 'label' => 'Rarely', 'value' => 3 ],
          [ 'label' => 'Never', 'value' => 4 ],
        ],
      ],
      [
        'order' => 3,
        'type' => 'message',
        'description' => 'This is a message',
      ],
      [
        'order' => 4,
        'type' => 'integer',
        'weight' => ['ak' => randomFloat(-3, 3), 'bcc' => randomFloat(-3, 3)],
        'question' => 'What is your age?',
        'description' => 'description',
        'min' => 0,
        'max' => 150,
        'fnc' => 'sqrt(x)',
      ]
    ];

    foreach ($questions as $question) {
      $weight = null;

      if (isset($question['weight'])) {
        $weight = Database::$weights->create([
          'ak' => $question['weight']['ak'],
          'bcc' => $question['weight']['bcc'],
        ]);
      }

      $entity = Database::$questions->create([
        'questionnaire_id' => $questionnaire->id,
        'weight_id' => ($weight !== null) ? $weight->id : 0,
        'order' => $question['order'],
        'type' => $question['type'],
        'question' => isset($question['question']) ? $question['question'] : null,
        'description' => isset($question['description']) ? $question['description'] : null,
        'min' => isset($question['min']) ? $question['min'] : null,
        'max' => isset($question['max']) ? $question['max'] : null,
        'fnc' => isset($question['fnc']) ? $question['fnc'] : null,
      ]);

      if (isset($question['choices'])) {
        foreach ($question['choices'] as $i => $choice) {
          Database::$question_choices->create([
            'question_id' => $entity->id,
            'order' => $i,
            'label' => $choice['label'],
            'value' => $choice['value'],
          ]);
        }
      }
    }
  }

}
