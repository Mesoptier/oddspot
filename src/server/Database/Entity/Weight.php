<?php
namespace OddSpot\Database\Entity;

use Spot\Entity;

class Weight extends Entity {

  protected static $table = 'weights';

  public static function fields() {
    return [
      'id' => ['type' => 'integer', 'primary' => true, 'autoincrement' => true],
      'ak' => ['type' => 'float', 'required' => true],
      'bcc' => ['type' => 'float', 'required' => true],
    ];
  }

}
