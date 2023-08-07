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
        Schema::create('site_infos', function (Blueprint $table) {
            $table->id();
            $table->text('about',5000);
            $table->text('refund',5000);
            $table->text('purchase_guide',5000);
            $table->text('privacy',5000);
            $table->text('address',5000);
            $table->text('process_steps',5000);
            $table->string('facebook_link');
            $table->string('twitter_link');
            $table->string('instagrm_link');
            $table->string('copyright_text');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_infos');
    }
};
