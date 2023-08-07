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
        Schema::create('product_lists', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('price');
            $table->string('image');
            $table->string('category');
            $table->string('subcategory');
            $table->string('remark');
            $table->string('author');
            $table->string('star')->nullable();
            $table->string('period');
            $table->string('start_date')->nullable();;
            $table->string('end_date')->nullable();;
            $table->string('ISBN');
            $table->string('quantity');
            $table->string('book_status');
            $table->string('shipping_details');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_lists');
    }
};
