<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class EquityUpload extends Model
{
    use Notifiable, HasApiTokens;Use UsesUuid;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    //protected $primaryKey = 'id';
    protected $primaryKey='id';
    protected $table="equity_upload";
    protected $fillable = [
        'created_by','last_updated_by','updated_at'
    ];
    protected $casts = [
        'id' => 'string',
    ];

}
