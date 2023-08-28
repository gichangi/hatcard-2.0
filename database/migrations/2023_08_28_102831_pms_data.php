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
        Schema::create('pms_data', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('region');
            $table->date('year');
            $table->text('components');
            $table->text('pillar');
            $table->text('category');
            $table->text('measure');
            $table->text('measure_name');
            $table->double('value')->nullable();
            $table->uuid('upload_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pms_data');
    }
};
