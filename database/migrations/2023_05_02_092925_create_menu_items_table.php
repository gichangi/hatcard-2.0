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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('name');
            $table->text('description');
            $table->text('menu_icon')->nullable();
            $table->text('menu_url');
            //Menu  : group,item,subfolder(collapse),
            $table->text('menu_type');
            //Menu category classifies the menu link type:  system-group,system-subfolder, system-link,custom-group,custom-subfolder,dashboard-link,
            $table->text('menu_category');
            $table->integer('order_id');
            $table->uuid('parent_id')->nullable();
            //Link all menu of type items and subfolder to group
            $table->uuid('menu_group_id')->nullable();
            $table->string('status');
            $table->uuid('created_by')->nullable();
            $table->uuid('last_updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
