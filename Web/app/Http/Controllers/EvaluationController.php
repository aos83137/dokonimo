<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EvaluationController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
      //
      $json = \App\Evaluation::all();
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
      $json = \App\Evaluation::create([
        'keeper_store_id'=>$request->keeper_store_id,
        'tourist_id'=>$request->tourist_id,
        'starpoint'=>$request->starpoint,
        'content'=>$request->content,
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
    $evaluations = DB::table('evaluations')
    ->join('tourists','evaluations.tourist_id', '=','tourists.tourist_id')
    ->select('tourists.tourist_name','evaluations.evaluation_id','evaluations.keeper_store_id','evaluations.tourist_id','evaluations.starpoint','evaluations.content')
    ->where('keeper_store_id',$id)
    ->get();

    return json_encode($evaluations, JSON_UNESCAPED_UNICODE);
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
      $json = \App\Evaluation::find($id)->update([
          'keeper_store_id'=>$request->keeper_store_id,
          'tourist_id'=>$request->tourist_id,
          'starpoint'=>$request->starpoint,
          'content'=>$request->content,
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
      $json = \App\Evaluation::destroy($id);

      return json_encode('Destroy seccessfully');
  }
}