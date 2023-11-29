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
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('business_name');
            $table->text('description')->nullable();
            $table->string('address');
            $table->string('district');
            $table->string('regency');
            $table->string('province');
            $table->string('postal_code');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();
            $table->string('business_number');
            $table->string('business_email');
            $table->string('business_photo')->nullable();
            $table->string('business_banner')->nullable();
            $table->string('website_link')->nullable();
            $table->string('social_link1')->nullable();
            $table->string('social_link2')->nullable();
            $table->string('social_link3')->nullable();
            $table->integer('status')->default(0);
            $table->integer('is_ban')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
