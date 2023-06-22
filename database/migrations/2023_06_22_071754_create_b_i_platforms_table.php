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
        Schema::create('bi_platforms', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('url');
            $table->string('platform'); //ie tableau
            $table->string('platform_type'); // public, server , hosted
            $table->enum('status',['Active','Archived','Pending Configuration']);
            $table->uuid('created_by')->nullable();
            $table->uuid('last_updated_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bi_platforms');
    }
};
