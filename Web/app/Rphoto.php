<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rphoto extends Model
{
  protected $fillable = [
      'rphoto_id', 'reservation_id', 'rphoto_url','rphoto_content',
  ];


  public function reservations()
  {
    return $this->belongsTo(Reservation::class);
  }
  public $timestamps = false;
}
