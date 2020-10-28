<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEvaluationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('evaluations', function (Blueprint $table) {
            $table->bigIncrements('evaluation_id');
            $table->bigInteger('keeper_store_id')->unsigned()->index();
            $table->bigInteger('tourist_id')->unsigned()->index();
            $table->Integer('starpoint');
            $table->timestamps();
            $table->string('content', 100);

            $table->foreign('keeper_store_id')->references('keeper_store_id')->on('kstoreinfos')->onDelete('cascade');
            $table->foreign('tourist_id')->references('tourist_id')->on('tourists')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('evaluations');
    }
}
