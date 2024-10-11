<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fisioterapis extends Model
{
    protected $table = 'fisioterapis'; // Pastikan nama tabel sesuai
    protected $fillable = ['nama', 'status', 'gender']; // Sesuaikan dengan kolom di tabel Anda
}
