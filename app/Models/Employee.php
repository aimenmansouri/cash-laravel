<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Employee extends Model
{
    protected $fillable = ['first_name', 'last_name', 'workplace', 'department'];

    public function phone(): HasOne
    {
        return $this->hasOne(Phone::class);
    }
}
