<?php

namespace App\Models\AdminModels;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class MenuItems extends Model
{
    use HasApiTokens;Use UsesUuid;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table="menu_items";
    protected $fillable = [
        'name', 'description','menu_image', 'menu_type','order_id', 'parent_id','menu_group_id', 'status', 'created_by','last_updated_by'
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