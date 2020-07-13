<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::resource('user','SibalController');
Route::resource('users','UserController');
Route::resource('tourists','TouristController');
Route::resource('keepers','KeeperController');
Route::resource('deliverys','DeliveryController');
Route::resource('evaluations','EvaluationController');
Route::resource('kstoreinfos','KstoreinfoController');
Route::resource('reservations','ReservationController');
Route::get('rtshow/{id}', 'ReservationController@rtshow');
Route::get('storeshow/{id}', 'KeeperxController@storeshow');
Route::get('rktshowall/{id}', 'ReservationController@rktshowall');

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@login');
Route::get('profile', 'UserController@getAuthenticatedUser');
Route::delete('reservedelete/{id}', 'ReservationController@destroy');
Route::post('reserveupdate/{id}', 'ReservationController@update');