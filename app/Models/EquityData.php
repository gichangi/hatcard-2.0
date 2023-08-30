<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class EquityData extends Model
{
    use Notifiable, HasApiTokens; Use UsesUuid; use HasRoles;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'id';
    protected $table="equity_data";
    protected $fillable = [
        "period","county","sub_county","indicator","value",'upload_id'
    ];
    protected $casts = [
        'id' => 'string',
    ];

}
