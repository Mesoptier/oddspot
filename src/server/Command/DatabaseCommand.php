<?php
namespace OddSpot\Command;

use ConsoleKit\Command;
use OddSpot\Database\Database;

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

    $constants = Database::$weights->create([
      'ak' => -3.294,
      'bcc' => -13.16
    ]);

    $questionnaire = Database::$questionnaires->create([
      'name' => 'OddSpot',
      'weights_id' => $constants->id,
    ]);

    $questions = [
      [
        'question' => 'Are you male or female?',
        'choices' => [
          [ 'label' => 'Male', 'value' => 0 ],
          [ 'label' => 'Female', 'value' => 1 ],
        ],
      ],
      [
        'question' => 'Have you, during your leisure time and before the age of 65, frequently been exposed to sunlight?',
        'choices' => [
          [ 'label' => 'Yes', 'value' => 0 ],
          [ 'label' => 'No', 'value' => 1 ],
          [ 'label' => 'Don\'t know', 'value' => 2 ],
        ],
      ],
      [
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
    ];

    foreach ($questions as $question) {
      $entity = Database::$questions->create([
        'questionnaire_id' => $questionnaire->id,
        'question' => $question['question'],
        'description' => isset($question['description']) ? $question['description'] : null,
      ]);

      foreach ($question['choices'] as $choice) {
        Database::$question_choices->create([
          'question_id' => $entity->id,
          'label' => $choice['label'],
          'value' => $choice['value'],
        ]);
      }
    }
  }

}
