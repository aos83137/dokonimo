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


Route::get('/', function () {
    return view('welcome');
});

Route::resource('user','SibalController');

Route::resource('tourists','TouristController');
Route::resource('keepers','KeeperController');
Route::resource('deliverys','DeliveryController');
Route::resource('evaluations','EvaluationController');
Route::resource('kstoreinfos','KstoreinfoController');
Route::resource('reservations','ReservationController');
