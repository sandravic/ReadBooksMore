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
        Schema::create('cart_orders', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no');
            $table->string('product_name');
            $table->string('ISBN');
            $table->string('rental_start_date');
            $table->string('rental_end_date');
            $table->string('extend_end_date')->nullable();
            $table->string('rental_period');
            $table->string('price');
            $table->string('email');
            $table->string('name');
            $table->string('payment_method');
            $table->text('delivery_address');
            $table->string('city');
            $table->string('order_date');
            $table->string('order_time');
            $table->string('order_status');
            $table->string('other_status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_orders');
    }
};
