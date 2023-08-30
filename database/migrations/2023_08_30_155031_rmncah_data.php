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
        Schema::create('rmncah_data', function (Blueprint $table) {
            $table->uuid('id');
            $table->date('period');
            $table->string('county');
            $table->string('sub_county');
            $table->text('indicator');
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
        Schema::dropIfExists('rmncah_data');
    }
};
