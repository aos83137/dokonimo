<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKstoreinfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kstoreinfos', function (Blueprint $table) {
          $table->bigIncrements('keeper_store_id');
          $table->bigInteger('keeper_id')->unsigned()->index();
          $table->string('keeper_store_name',100);
          $table->string('keeper_store_address', 100);
          $table->string('keeper_store_tel', 100);
          $table->string('keeper_store_openinghours', 100);
          $table->float('keeper_store_latitude',10,6);
          $table->float('keeper_store_longtitude',10,6);
          $table->integer('keeper_store_bag_cnt');
          $table->integer('keeper_store_car_cnt');

          $table->foreign('keeper_id')->references('keeper_id')->on('keepers')
          ->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kstoreinfos');
    }
}
