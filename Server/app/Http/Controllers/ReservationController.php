<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
      $json = \App\Reservation::find($id)->update([
        'keeper_store_id'=>$request->keeper_store_id,
        'tourist_id'=>$request->tourist_id,
        'delivery_id'=>$request->delivery_id,
        'check_in'=>$request->check_in,
        'check_out'=>$request->check_out,
        'bag_cnt'=>$request->bag_cnt,
        'car_cnt'=>$request->car_cnt,
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
      $json = \App\Reservation::destroy($id);

      return json_encode('Destroy seccessfully');
  }
}
