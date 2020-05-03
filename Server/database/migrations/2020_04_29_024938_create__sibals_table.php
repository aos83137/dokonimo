<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSibalsTable extends Migration
{

    public function up()
    {
        Schema::create('sibals', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('name');
          $table->string('email');
          $table->string('phone_number');
          $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('sibals');
    }
}
