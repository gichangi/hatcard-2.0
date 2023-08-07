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
        Schema::create('progressive_models', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('region');
            $table->string('year');
            $table->string('component');
            $table->string('pillar');
            $table->string('category');
            $table->string('measure');
            $table->string('measure_name');
            $table->integer('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progressive_models');
    }
};
