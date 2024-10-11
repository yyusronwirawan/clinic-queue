<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFisioterapisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fisioterapis', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Nama fisioterapis
            $table->string('status'); // Status fisioterapis (e.g., aktif/non-aktif)
            $table->enum('gender', ['Laki-Laki', 'Perempuan']); // Gender dengan enum
            $table->unsignedBigInteger('queue_number_id')->nullable(); // Queue number
            $table->unsignedBigInteger('late_queue_number')->nullable(); // Late queue number
            $table->timestamps(); // Menyimpan waktu create dan update
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fisioterapis');
    }
}
