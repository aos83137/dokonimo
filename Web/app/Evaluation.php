<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
  protected $fillable = [
      'evaluation_id', 'keeper_store_id', 'tourist_id','starpoint',
      'content'
  ];

  public function tourists()
  {
    return $this->belongsTo(Tourist::class);
  }

  public function kstoreinfos()
  {
    return $this->belongsTo(Kstoreinfo::class);
  }
  

}
