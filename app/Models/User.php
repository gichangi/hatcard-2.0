<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Traits\UsesUuid;
use App\Models\AdminModels\MenuItems;
use App\Models\AdminModels\Organisation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens; Use UsesUuid;use HasRoles;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'id';
    protected $table="users";
    protected $fillable = [
       'first_name','middle_name','last_name','organisation_id', 'email','phone', 'password','user','status'
    ];
/*    protected $appends = [
        'permission'
    ];
    protected $with =[
        'permissions'
    ];*/
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token'
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'id' => 'string',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

/*    public function userpermissions(){
        return $this->belongsTo(role::class,'organisation_id','id');
    }*/

    public function userRoles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'model_has_roles','model_uuid', 'role_id')->select(['id','name']);
    }
    public function menus(): BelongsToMany
    {
        return $this->belongsToMany(MenuItems::class, 'user_has_menus','user_id', 'menu_id')->select(['id','name']);
    }
    public function organisations(): BelongsToMany
    {
        return $this->belongsToMany(Organisation::class, 'user_has_organisations','user_id', 'organisation_id')->select(['id','name']);
    }

    public function userPermissions(): BelongsToMany
    {
        return $this->userRoles()
            ->join('role_has_permissions','roles.id','role_has_permissions.role_id')
            ->join('permissions','role_has_permissions.permission_id','permissions.id')
            ->select(['permissions.name'])
            ->distinct();
    }
}
