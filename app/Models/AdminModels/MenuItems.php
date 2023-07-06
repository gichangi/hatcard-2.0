<?php

namespace App\Models\AdminModels;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;


class MenuItems extends Model
{
    use HasApiTokens;Use UsesUuid; Use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $keyType = 'string';
    public $incrementing = false;
    protected $table="menu_items";
    protected $dates = ['deleted_at'];
    protected $fillable = [
        'id','name', 'description','menu_image','menu_icon','menu_type','menu_url','menu_category','order_id', 'parent_id', 'status', 'created_by','last_updated_by'
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

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id')->with('children')->select('id','name as title','menu_type as type','menu_category as category','menu_url as url','menu_icon as icon','parent_id','order_id')->where('status','active')->orderBy('order_id');
    }
}
