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
        Schema::create('return_orders', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_no');
            $table->string('extend_invoice_no')->nullable();
            $table->string('product_name');
            $table->string('ISBN');
            $table->string('email');
            $table->string('name')->nullable();
            $table->string('reference_number');
            $table->text('from_address');
            $table->text('return_address')->nullable();
            $table->string('contact_number');
            $table->string('return_date');
            $table->string('return_time');
            $table->string('return_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('return_orders');
    }
};
