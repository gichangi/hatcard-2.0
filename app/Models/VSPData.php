<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class VSPData extends Model
{
    use Notifiable, HasApiTokens; Use UsesUuid; use HasRoles;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'id';
    protected $table="vsp_data";
    protected $fillable = [
        'value','county','period','indicator_on_khis','khis_uid','data_group','data_sub_group','indicator','definition','data_source','category','upload_id'
    ];
    protected $casts = [
        'id' => 'string',
    ];

    function vspUpload(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(VSPUpload::class, 'upload_id');
    }
}