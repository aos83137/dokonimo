<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
          $table->bigIncrements('reservation_id');
          $table->bigInteger('keeper_store_id')->unsigned()->index();
          $table->bigInteger('tourist_id')->unsigned()->index();
          $table->bigInteger('delivery_id')->unsigned()->nullable();
          $table->date('check_in');
          $table->date('check_out');
          $table->integer('bag_cnt');
          $table->integer('car_cnt');

          $table->foreign('keeper_store_id')->references('keeper_store_id')->on('kstoreinfos')->onDelete('cascade');
          $table->foreign('tourist_id')->references('tourist_id')->on('tourists')->onDelete('cascade');
          $table->foreign('delivery_id')->references('delivery_id')->on('deliverys')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
