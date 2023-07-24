<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = Role::with('permissions')->get();
        return response()->json(['roles'=>$roles],200);
    }

    public function getPermissions(): \Illuminate\Http\JsonResponse
    {
        //
        $permissions = Permission::orderBy('name', 'ASC')->select('name','id')->get();
        return response()->json(['permissions'=>$permissions],200);
    }

    public function getUserRolesPermissions(): \Illuminate\Http\JsonResponse
    {
        $permissions = DB::table('permissions')
            ->join('role_has_permissions', function (JoinClause $join) {
                $join->on('permissions.id', '=', 'role_has_permissions.permission_id');
            })
            ->join('model_has_roles', function (JoinClause $join) {
                $join->on('role_has_permissions.role_id', '=', 'model_has_roles.role_id')
                    ->where('model_has_roles.model_uuid', '=', Auth::user()->id);
            })
            ->select('permissions.name','permissions.id')
            ->get();
        return response()->json(['user_permissions'=>$permissions],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        //
        $id= array_key_exists("id",$request->all())?$request->id:null;

        $roleUp = Role::updateOrCreate(
            ['id'=>$id,'name'=>$request->name,'description'=>$request->description,'guard_name'=>'api']
        );

        if($roleUp->save()){
            $role = Role::all()->where("name","=",$request->name)->first();
            $permissions = Permission::all()->pluck('id')->toArray();
            DB::table('role_has_permissions')->where('role_id','=',$role->id)->delete();
            foreach($request->permissions as $permission){
                if(in_array($permission['id'], $permissions)){
                    DB::table('role_has_permissions')->insert([
                        'permission_id' => $permission['id'],
                        'role_id' => $role->id
                    ]);
                }
            }
            return response()->json(['message'=>["type"=>"success","message"=>"Role successfully stored"],200]);
        }else{
            return response()->json(['message'=>["type"=>"error","message"=>"Error Occurred While Saving Role Details"],200]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        //
        $id=$request->id;
        $role = Role::where('id',$id)->delete();
        return response()->json(['message' => ['type'=>'success']], 200);
    }
}
