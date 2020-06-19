<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\PayloadFactory;
use Tymon\JWTAuth\JWTManager as JWT;




class Keeper extends Authenticatable implements JWTSubject
{
  use Notifiable;

  protected $fillable = [
      'keeper_id', 'keeper_name', 'keeper_password','keeper_email', 'keeper_phonenumber', 
  ];
  protected $hidden = [
    'password', 'remember_token',
  ];
  public function getJWTIdentifier()
  {
      return $this->getKey();
  }
  public function getJWTCustomClaims()
  {
      return [];
  }
  public function  kstoreinfos()
  {
    return $this->hasMany(Kstoreinfo::class);
  }
  public $timestamps = false;
}
