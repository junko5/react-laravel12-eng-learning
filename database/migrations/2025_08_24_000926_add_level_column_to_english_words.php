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
        Schema::table('english_words', function (Blueprint $table) {
            $table->integer('level')->default(1)->after('meaning');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('english_words', function (Blueprint $table) {
            $table->dropColumn('level');
        });
    }
};
