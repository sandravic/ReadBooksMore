<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $guarded = [
        'name',
        'email',
        'mobile_number',
        'message',
        'contact_time',
        'contact_date',
    ];
}
