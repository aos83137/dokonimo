<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDreservations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('dreservations', function (Blueprint $table) {
          $table->bigIncrements('d_reservation_id');
          $table->Integer('d_price');
          $table->string('d_reservation_status', 20);
          $table->timestamps();


          $table->foreign('d_reservation_id')->references('reservation_id')->on('reservations')->onDelete('cascade');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dreservations');
    }
}
