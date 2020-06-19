<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
  protected $fillable = [
      'reservation_id', 'keeper_store_id', 'tourist_id','delivery_id','check_in','check_out'
      ,'bag_cnt','car_cnt','reservation_status', 'reservation_latitude','reservation_longtitude',
  ];

  public function kstoreinfos()
  {
    return $this->belongsTo(Kstoreinfo::class);
  }

  public function tourists()
  {
    return $this->belongsTo(Tourist::class);
  }

  public function deliverys()
  {
    return $this->belongsTo(Delivery::class);
  }
  public function dreservations()
  {
    return $this->hasOne(Dreservation::class);
  }

  public $timestamps = false;
}
