<?php

namespace App\Models\AdminModels;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class BIDashboards extends Model
{
    use HasApiTokens;Use UsesUuid; Use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table="bi_dashboards";
    protected array $dates = ['deleted_at'];
    protected  $hidden  = [
        'config_json->credentials'
    ];
    protected $fillable = [
        'name', 'description','parent_menu_uid','server_uid','config_json','status','created_by','last_updated_by'
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
