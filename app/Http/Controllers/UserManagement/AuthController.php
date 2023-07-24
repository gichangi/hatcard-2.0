<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    /**
     * Login
     */
    public function login(Request $request)
    {

        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];

        $user=User::with('permissions')->where('email','=',$request->email)->first();
        $permissions = DB::table('users')->where('users.id','=',$user->id)
            ->leftJoin('model_has_roles','users.id','=','model_has_roles.model_uuid')
            ->leftJoin('roles','model_has_roles.role_id','=','roles.id')
            ->leftJoin('role_has_permissions','roles.id','=','role_has_permissions.role_id')
            ->leftJoin('permissions','role_has_permissions.permission_id','=','permissions.id')
            ->select('permissions.name')->get()->pluck('name')->toArray();
        $user->permissions=$permissions;

        if($user){
            if (auth()->attempt($data)) {
                $token = auth()->user()->createToken('LaravelAuthApp')->accessToken;
                return response()->json(['token' => $token], 200);
            }
        }
        return response()->json(['error' => 'Unauthorised'], 401);
    }
}
