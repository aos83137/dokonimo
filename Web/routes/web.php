<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
function Console_log($data){
    echo "<script>console.log( 'PHP_Console: " . $data . "' );</script>";
}


Route::get('/{any}', function () {
    return view('welcome');
})->where('any','.*');

Route::resource('user','SibalController');

Route::resource('tourists','TouristController');
Route::resource('keeperx','KeeperxController');
Route::resource('deliverys','DeliveryController');
Route::resource('evaluations','EvaluationController');
Route::resource('kstoreinfos','KstoreinfoController');
Route::resource('reservations','ReservationController');
Route::get('rtshow/{id}', 'ReservationController@rtshow');
Route::get('storeshow/{id}', 'KeeperxController@storeshow');
