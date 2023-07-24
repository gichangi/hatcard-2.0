<?php

namespace App\Http\Controllers\UserManagement;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\BIDashboards;
use App\Models\AdminModels\MenuItems;
use App\Models\AdminModels\Organisation;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //
        $users = User::query()
            ->with('userRoles','menus:id','organisations:id')
            ->get();
        return response()->json(['users' => $users], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Register a new system user
     */
    public function store(Request $request): \Illuminate\Http\JsonResponse
    {

        try {
            $userId = array_key_exists("id",$request->all())?$request->id:null;
            $password = array_key_exists("password",$request->all())?$request->password:null;
            $user=User::all()->where('email','=',$request->email)->first();

            if($user && !$userId){
                return response()->json(["message"=>["type"=>"error","message"=>"Email Account ".$user->email." already registered"]],200);
            }

            if($user != null && $password === null){
                $password = $user->password;
            }else{
                $password = Hash::make($password);
            }

            $user= User::updateOrCreate(
                ["id"=>$userId],
                [
                    "first_name"=>strip_tags(strtolower($request->first_name)),
                    "middle_name"=>strip_tags(strtolower($request->middle_name)),
                    "last_name"=>strip_tags(strtolower($request->last_name)),
                    "email"=>strip_tags($request->email),
                    "phone"=>strip_tags($request->phone),
                    "password"=>$password,
                    "user"=>Auth::user()->id
                ]
            );
            if($user->save()){
                DB::table('model_has_roles')->where('model_uuid','=',$user->id)->delete();
                $user->assignRole($request->roles);

                if($request->menus != null){
                    DB::table('user_has_menus')->where('user_id','=',$user->id)->delete();
                    $menus = MenuItems::all()->pluck('id')->toArray();
                    foreach($request->menus as $menu){
                        if(in_array($menu, $menus)){
                            error_log('Some menu -> '.$menu);
                            DB::table('user_has_menus')->insert([
                                'user_id' => $user->id,
                                'menu_id' => $menu
                            ]);
                        }
                    }
                }
                if($request->organisations != null){
                    DB::table('user_has_organisations')->where('user_id','=',$user->id)->delete();
                    $organisations = Organisation::all()->pluck('id')->toArray();
                    foreach($request->organisations  as $organisation){
                        if(in_array($organisation, $organisations)){
                            DB::table('user_has_organisations')->insert([
                                'user_id' => $user->id,
                                'organisation_id' => $organisation
                            ]);
                        }
                    }
                }
                return response()->json(["message"=>["type"=>"success","message"=>"Nothing went wrong"]],200);
            }
            return response()->json(["message"=>["type"=>"error","message"=>"An error occurred kindly try again"]],200);
        }Catch(\Exception $e){
            return response()->json(["message"=>["type"=>"error","message"=>"".$e->getMessage().""]],200);
        }
    }

    public function updateOrganisations($orgs,$user){

    }

    /**
     * Display user details.
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
     * Update user details.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    public function build_tree(&$items, $parentId = null) {
        $treeItems = [];
        foreach ($items as $idx => $item) {
            if((empty($parentId) && empty($item['parent_id'])) || (!empty($item['parent_id']) && !empty($parentId) && $item['parent_id'] == $parentId)) {
                $items[$idx]['children'] = $this->build_tree($items, $items[$idx]['id']);
                $treeItems []= $items[$idx];
            }
        }

        return $treeItems;
    }

    /**
     * Update user account.
     */
    public function account(): \Illuminate\Http\JsonResponse
    {
        $user = Auth::user();
        return response()->json(['account' => $user->only(['first_name', 'middle_name','last_name','email','phone'])], 200);
    }




    function unique_multidim_array($array, $key) {
        $temp_array = array();
        $i = 0;
        $key_array = array();

        foreach($array as $val) {
            if (!in_array($val[$key], $key_array)) {
                $key_array[$i] = $val[$key];
                $temp_array[$i] = $val;
            }
            $i++;
        }
        return $temp_array;
    }

    /**
     * Update user account.
     */
    public function password(Request $request): \Illuminate\Http\JsonResponse
    {

        $user = User::find(Auth::user()->id);
        $user->password = Hash::make($request->password);

        if($user->save()){
            return response()->json(["message"=>["type"=>"success","message"=>"Password was updated successfully"]],200);
        }
        return response()->json(["message"=>["type"=>"error","message"=>"Something went wrong"]],200);
    }



    /**
     * Remove user
     */
    public function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        //
        try {
            if( $request->id != Auth::user()->id){
                if(User::where('id',$request->id)->delete()){
                   return response()->json(["message"=>["status"=>"success","message"=>"user deleted successfully"]],200);
                }
                return response()->json(["message"=>["status"=>"error","message"=>"Error deleting user"]],200);
            }else{
                return response()->json(["message"=>["status"=>"error","message"=>"Cannot delete logged-in user"]],200);
            }
        }Catch(\Exception $e){
            return response()->json(["message"=>["status"=>"error","message"=>$e->getMessage()]],200);
        }
    }


    /**
     * Archive User
     */
    public function archive(Request $request): \Illuminate\Http\JsonResponse
    {
        //
        try {
            if( $request->id != Auth::user()->id){
                $user = User::find($request->id);
                $user->status = 1;
                if($user->save()){
                    return response()->json(["message"=>["status"=>"success","message"=>"user archived successfully"]],200);
                }
                return response()->json(["message"=>["status"=>"error","message"=>"Error archived user"]],200);
            }else{
                return response()->json(["message"=>["status"=>"error","message"=>"Cannot archived logged-in user"]],200);
            }
        }Catch(\Exception $e){
            return response()->json(["message"=>["status"=>"error","message"=>$e->getMessage()]],200);
        }
    }

    public function details(Request $request){
        $userDetails = User::where('email',$request->email)->get()->first();
        return response()->json(['details' => $userDetails], 200);
    }
}
