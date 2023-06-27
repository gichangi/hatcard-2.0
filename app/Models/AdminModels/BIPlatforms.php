<?php

namespace App\Models\AdminModels;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;


class BIPlatforms extends Model
{
    use HasApiTokens;Use UsesUuid; Use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table="bi_platforms";
    protected array $dates = ['deleted_at'];
    protected  $hidden  = [
        'config_json->credentials'
    ];
    protected $fillable = [
        'name', 'description','base_url','platform','platform_type','config_json','status','config_status','created_by','last_updated_by'
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
