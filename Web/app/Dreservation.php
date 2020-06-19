<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dreservation extends Model
{

  protected $fillable = [
      'd_reservation_id', 'd_price', 'd_reservation_status'
  ];

  public function dreservations()
  {
    return $this->belongsTo(Reservation::class);
  }
}
