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
        Schema::create('bi_dashboards', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('server_uid')->nullable();
            $table->string('dashboard_type');
            $table->string('parent_menu_uid'); //ie tableau
            $table->enum('status',['Active','Archived']);
            $table->json('config_json')->nullable();
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
        Schema::dropIfExists('bi_dashboards');
    }
};
