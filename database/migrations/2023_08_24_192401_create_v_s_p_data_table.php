<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vsp_data', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('county');
            $table->date('period');
            $table->text('indicator_on_khis')->nullable();
            $table->string('khis_uid')->nullable();
            $table->text('category')->nullable();
            $table->text('data_group');
            $table->text('data_sub_group');
            $table->text('indicator');
            $table->text('definition')->nullable();
            $table->text('data_source')->nullable();
            $table->double('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vsp_data');
    }
};
