<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnglishWords extends Model
{
    protected $fillable = [
        'word',
        'meaning',
    ];
}
