<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class ProgressiveModel extends Model
{
    use Notifiable, HasApiTokens; Use UsesUuid; use HasRoles;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'id';
    protected $table="progressive_models";
    protected $fillable = [
        'region','year','component','pillar','category', 'measure','measure_name', 'value'
    ];
    protected $casts = [
        'id' => 'string',
    ];
}
