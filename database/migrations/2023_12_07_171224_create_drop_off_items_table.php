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
        Schema::create('drop_off_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('drop_off_id');
            $table->foreign('drop_off_id')->references('id')->on('drop_offs')->onDelete('cascade');
            $table->unsignedBigInteger('business_item_id');
            $table->foreign('business_item_id')->references('id')->on('business_items')->onDelete('cascade');
            $table->integer('weight')->default(0);
            $table->integer('approx_earn')->default(0);
            $table->integer('status')->nullable(); // 0 = declined, 1 = picked up
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drop_off_items');
    }
};
