<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kstoreinfo extends Model
{
  protected $fillable = [
      'keeper_store_id', 'keeper_id', 'keeper_store_name','keeper_store_address',
      'keeper_store_tel', 'keeper_store_openinghours','keeper_store_latitude',
      'keeper_store_longtitude', 'keeper_store_bag_cnt', 'keeper_store_car_cnt',
      'keeper_store_imgurl',
  ];

  public function keepers()
  {
    return $this->belongsTo(Keeper::class);
  }
  public function reservations()
  {
    return $this->hasMany(Reservation::class);
  }
  public function evaluations()
  {
    return $this->hasMany(Evaluation::class);
  }
  public $timestamps = false;
}
