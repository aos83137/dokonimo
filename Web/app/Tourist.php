<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tourist extends Model
{
  protected $fillable = [
      'tourist_id', 'tourist_name', 'tourist_email','tourist_password',' tourist_phonenumber'
  ];

  public function reservations()
  {
    return $this->hasOne(Reservation::class);
  }

  public function evaluations()
  {
    return $this->hasMany(Reservation::class);
  }
  public $timestamps = false;
}
