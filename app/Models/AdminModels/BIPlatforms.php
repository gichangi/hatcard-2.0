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
    protected $fillable = [
        'name', 'description','url','platform','platform_type','status','created_by','last_updated_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $casts = [
        'id' => 'string',
    ];
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

}
