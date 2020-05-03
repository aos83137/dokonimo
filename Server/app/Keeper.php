<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Keeper extends Model
{
  protected $fillable = [
      'keeper_id', 'keeper_name', 'keeper_password','keeper_email', 'keeper_phonenumber'
  ];

  public function  kstoreinfos()
  {
    return $this->hasMany(Kstoreinfo::class);
  }
}
