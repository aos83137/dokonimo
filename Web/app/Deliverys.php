<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Deliverys extends Model
{
  protected $fillable = [
      'delivery_id', 'delivery_name', 'delivery_email','delivery_phonenumber','delivery_car','delivery_password'
  ];

  public function reservations()
  {
    return $this->hasOne(Reservation::class);
  }
  public $timestamps = false;
}
