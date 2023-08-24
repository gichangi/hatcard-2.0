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
        Schema::create('dhis_data', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('organisationunitid');
            $table->text('organisationunitname')->nullable();
            $table->text('organisationunitcode')->nullable();
            $table->text('organisationunitdescription')->nullable();
            $table->string('periodid')->nullable();
            $table->string('periodname')->nullable();
            $table->string('periodcode')->nullable();
            $table->text('perioddescription');
            $table->string('dataid');
            $table->text('dataname');
            $table->string('datacode')->nullable();
            $table->text('datadescription')->nullable();
            $table->double('total')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dhis_data');
    }
};
