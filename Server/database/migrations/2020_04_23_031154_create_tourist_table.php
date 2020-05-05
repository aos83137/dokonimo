<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTouristTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tourists', function (Blueprint $table) {
            $table->bigIncrements('tourist_id');
            $table->string('tourist_name', 100);
            $table->string('tourist_phonenumber',100);
            $table->string('tourist_email', 100);
            $table->string('tourist_password', 100);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tourists');
    }
}
