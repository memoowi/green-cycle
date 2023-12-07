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
        Schema::create('payment_methods', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pick_up_id');
            $table->foreign('pick_up_id')->references('id')->on('pick_ups')->onDelete('cascade');
            $table->unsignedBigInteger('drop_off_id');
            $table->foreign('drop_off_id')->references('id')->on('drop_offs')->onDelete('cascade');
            $table->enum('type', ['cash', 'transfer', 'e-wallet']);
            $table->string('account_name')->nullable();
            $table->string('account_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_methods');
    }
};
