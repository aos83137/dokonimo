<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Reservation;

class RphotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $json = \App\Rphoto::all();
      return json_encode($json, JSON_UNESCAPED_UNICODE);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $json = \App\Rphoto::create([

          'reservation_id'=>$request->reservation_id,
          'rphoto_url'=>$request->rphoto_url,
          'rphoto_content'=>$request->rphoto_content,
      ]);
      if($json){
          return json_encode('Insert successfully');
      }else{
          return json_encode('Insert failed');
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
      $reservation_photo = DB::table('rphotos')
                            ->join('reservations','rphotos.reservation_id', '=','reservations.reservation_id')
                            ->select('rphotos.rphoto_url','rphotos.rphoto_content')
                            ->where('reservations.reservation_id',$id)
                            ->get();
      return json_encode($reservation_photo, JSON_UNESCAPED_UNICODE);
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
        //
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
    }
}
