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
        Schema::create('equity_data', function (Blueprint $table) {
            $table->uuid('id');
            $table->date('period');
            $table->string('county');
            $table->string('data_group');
            $table->string('data_sub_group');
            $table->text('indicator');
            $table->double('score')->nullable();
            $table->uuid('upload_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equity_data');
    }
};
