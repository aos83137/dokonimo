<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Keeper;
use Illuminate\Support\Facades\DB;
use App\Kstoreinfo;

class KeeperxController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
       //
       $json = \App\Keeper::all();
       return json_encode($json, JSON_UNESCAPED_UNICODE);
  }


  public function storeshow($id)
  {
    $storeshow = DB::table('kstoreinfos')->where('keeper_id',$id)->get();
    return json_encode($storeshow, JSON_UNESCAPED_UNICODE);
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
      $json = \App\Keeper::create([
          'keeper_name'=>$request->keeper_name,
          'keeper_password'=>$request->keeper_password,
          'keeper_email'=>$request->keeper_email,
          'keeper_phonenumber'=>$request->keeper_phonenumber,
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
      $json = \App\Keeper::find($id)->update([
        'keeper_name'=>$request->keeper_name,
        'keeper_password'=>$request->keeper_password,
        'keeper_email'=>$request->keeper_email,
        'keeper_phonenumber'=>$request->keeper_phonenumber,
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
      $json = \App\Keeper::destroy($id);

      return json_encode('Destroy seccessfully');
  }

}