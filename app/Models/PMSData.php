<?php

namespace App\Models;

use App\Http\Traits\UsesUuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class PMSData extends Model
{
    use Notifiable, HasApiTokens; Use UsesUuid; use HasRoles;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    protected $primaryKey = 'id';
    protected $table="pms_data";
    protected $fillable = [
        "region","year","components","pillar","category","measure","measure_name","value",'upload_id'
    ];
    protected $casts = [
        'id' => 'string',
    ];

    function vspUpload(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(VSPUpload::class, 'upload_id');
    }
}
