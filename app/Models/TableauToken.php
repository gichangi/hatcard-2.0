<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class TableauToken extends Model
{
    use HasApiTokens;Use UsesUuid;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table="tableau_tokens";
    protected  $hidden  = [
        'config_json->credentials'
    ];
    protected $fillable = [
        'server_id', 'token'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'id' => 'string',
        'config_json' => 'object'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
}
