<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Kstoreinfo;
use App\Evaluation;
use Illuminate\Support\Facades\DB;
class KstoreinfoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
      //
      $json = \App\Kstoreinfo::all();
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
      $json = \App\Kstoreinfo::create([
        'keeper_id'=>$request->keeper_id,
        'keeper_store_name'=>$request->keeper_store_name,
        'keeper_store_address'=>$request->keeper_store_address,
        'keeper_store_tel'=>$request->keeper_store_tel,
        'keeper_store_openinghours'=>$request->keeper_store_openinghours,
        'keeper_store_latitude'=>$request->keeper_store_latitude,
        'keeper_store_longtitude'=>$request->keeper_store_longtitude,
        'keeper_store_bag_cnt'=>$request->keeper_store_bag_cnt,
        'keeper_store_car_cnt'=>$request->keeper_store_car_cnt,
        'keeper_store_imgurl'=>$request->keeper_store_imgurl,
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
    $kstoreinfos = json_encode(DB::table('kstoreinfos')->where('keeper_store_id',$id)->first());
    $kstoreinfos2 = json_encode(DB::table('evaluations')->where('keeper_store_id',$id)->get());

    $a[] = json_decode($kstoreinfos);
    $a[] = json_decode($kstoreinfos2);

    return json_encode($a, JSON_UNESCAPED_UNICODE);
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
      $json = \App\Kstoreinfo::where('keeper_store_id', $id)->update([
          'keeper_store_name'=>$request->keeper_store_name,
          'keeper_store_address'=>$request->keeper_store_address,
          'keeper_store_tel'=>$request->keeper_store_tel,
          'keeper_store_openinghours'=>$request->keeper_store_openinghours,
          'keeper_store_bag_cnt'=>$request->keeper_store_bag_cnt,
          'keeper_store_car_cnt'=>$request->keeper_store_car_cnt,

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
      $json = \App\Kstoreinfo::destroy($id);

      return json_encode('Destroy seccessfully');
  }
}
