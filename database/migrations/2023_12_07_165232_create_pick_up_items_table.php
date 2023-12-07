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
        Schema::create('pick_up_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pick_up_id');
            $table->foreign('pick_up_id')->references('id')->on('pick_ups')->onDelete('cascade');
            $table->unsignedBigInteger('item_id');
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->integer('weight')->default(0);
            $table->string('approx_earn')->default(0);
            $table->integer('status')->nullable(); // 0 = declined, 1 = picked up
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pick_up_items');
    }
};
