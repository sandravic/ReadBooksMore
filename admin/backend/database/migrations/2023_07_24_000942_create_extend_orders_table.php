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
        Schema::create('extend_orders', function (Blueprint $table) {
            $table->id();
            $table->string('cart_order_id');
            $table->string('extend_invoice_no');
            $table->string('extend_start_date');
            $table->string('extend_end_date');
            $table->string('extend_price');
            $table->string('email');
            $table->string('ISBN');
            $table->string('product_name');
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
        Schema::dropIfExists('extend_orders');
    }
};
