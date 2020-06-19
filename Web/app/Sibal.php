<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Sibal extends Model
{
  protected $fillable = [
      'id', 'name', 'email','phone_number'
  ];
}
