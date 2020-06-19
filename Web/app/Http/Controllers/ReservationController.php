<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Tourist;
use App\Reservation;

class ReservationController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
      //
      $json = \App\Reservation::all();
      return $json;
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
      // //

  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
      $json = \App\Reservation::create([
          'keeper_store_id'=>$request->keeper_store_id,
          'tourist_id'=>$request->tourist_id,
          'delivery_id'=>$request->delivery_id,
          'check_in'=>$request->check_in,
          'check_out'=>$request->check_out,
          'bag_cnt'=>$request->bag_cnt,
          'car_cnt'=>$request->car_cnt,
          'reservation_status'=>$request->reservation_status,
          'reservation_longtitude'=>$request->reservation_longtitude,
          'reservation_latitude'=>$request->reservation_latitude,
      ]);
      if($json){
          return json_encode('Insert seccessfully');
      }else{
          return json_encode('Insert field');
      }

  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
      //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
      //
      // $question = \App\Question::find($id);

      // return view('view.register', compact('question'));
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
      $json = \App\Reservation::where('reservation_id',$id)->update([

        'delivery_id'=>$request->delivery_id,
        'reservation_status'=>$request->reservation_status,
      ]);



      if($json){
          return json_encode('Insert seccessfully');
      }else{
          return json_encode('Insert field');
      }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
      //
      $json = \App\Reservation::where('reservation_id',$id)->destroy();

      return json_encode('Destroy seccessfully');
  }

  public function rtshow($id)
  {
    $reservation_tourist = DB::table('reservations')
                          ->join('tourists','reservations.tourist_id', '=','tourists.tourist_id')
                          ->join('kstoreinfos','reservations.keeper_store_id','=','kstoreinfos.keeper_store_id')
                          ->select('tourists.tourist_id','tourists.tourist_name','tourists.tourist_phonenumber','kstoreinfos.keeper_store_name','reservations.check_in','reservations.check_out','reservations.bag_cnt','reservations.car_cnt','reservations.reservation_id', 'reservations.reservation_status')
                          ->where('kstoreinfos.keeper_id',$id)
                          ->orderBy('reservation_id', 'desc')
                          ->get();
    return json_encode($reservation_tourist, JSON_UNESCAPED_UNICODE);
  }

  public function rktshow($id)
  {
    $reservation_store= DB::table('reservations')
                          ->join('kstoreinfos','reservations.keeper_store_id', '=','kstoreinfos.keeper_store_id')
                          ->where('reservations.reservation_id',$id)
                          ->get();
    return json_encode($reservation_store, JSON_UNESCAPED_UNICODE);
  }

  public function rktshowall($id)
  {
    $reservation_storeall = DB::table('reservations')
                          ->join('tourists','reservations.tourist_id', '=','tourists.tourist_id')
                          ->join('kstoreinfos','kstoreinfos.keeper_store_id', '=','reservations.keeper_store_id')
                          ->select('reservation_id', 'keeper_store_name', 'tourist_id','tourist_name','tourist_phonenumber','delivery_id','check_in','check_out','bag_cnt','car_cnt','reservation_status','reservation_latitude','reservation_longtitude','keeper_store_name')
                          ->get();
    return json_encode($reservation_storeall, JSON_UNESCAPED_UNICODE);
  }
  // tourist_phonenumber/check_in/check_out/bag_cnt/car_cn

  // $users = DB::table('users')
  //           ->join('contacts', 'users.id', '=', 'contacts.user_id')
  //           ->join('orders', 'users.id', '=', 'orders.user_id')
  //           ->select('users.*', 'contacts.phone', 'orders.price')
  //           ->get();
}
