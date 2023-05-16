<?php

namespace App\Models\AdminModels;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class MenuGroup extends Model
{
    use HasApiTokens;Use UsesUuid;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table="menu_groups";
    protected $fillable = [
        'name', 'description','group_icon', 'group_type','order_id', 'status', 'created_by','last_updated_by'
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
