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
        Schema::create('pick_ups', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('location_id');
            $table->foreign('location_id')->references('id')->on('locations')->onDelete('cascade');
            $table->unsignedBigInteger('business_id');
            $table->foreign('business_id')->references('id')->on('businesses')->onDelete('cascade');
            $table->string('photo');
            $table->string('amount_paid')->default(0);
            $table->string('invoice_photo')->nullable();
            $table->date('completed_at')->nullable();
            $table->integer('status')->default(0); // 0=pending, 1=canceled, 2=accepeted, 3=declined, 4=On The Way, 5=Completed
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pick_ups');
    }
};
