<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = ['att_uid', 'timestamp', 'user_id', 'name'];
}
