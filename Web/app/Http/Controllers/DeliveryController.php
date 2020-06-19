<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DeliveryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
      //
      $json = \App\Deliverys::all();

      return json_encode($json, JSON_UNESCAPED_UNICODE);
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
      $json = \App\Deliverys::create([
          'delivery_name'=>$request->delivery_name,
          'delivery_email'=>$request->delivery_email,
          'delivery_car'=>$request->delivery_car,
          'delivery_phonenumber'=>$request->delivery_phonenumber,
          'delivery_password'=>$request->delivery_password,
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
      $json = \App\Deliverys::find($id)->update([
        'delivery_name'=>$request->delivery_name,
        'delivery_email'=>$request->delivery_email,
        'delivery_car'=>$request->delivery_car,
        'delivery_phonenumber'=>$request->delivery_phonenumber,
        'delivery_password'=>$request->delivery_password,
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
      $json = \App\Deliverys::destroy($id);

      return json_encode('Destroy seccessfully');
  }
}
