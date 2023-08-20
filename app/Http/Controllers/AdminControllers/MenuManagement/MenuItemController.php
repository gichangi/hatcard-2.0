<?php

namespace App\Http\Controllers\AdminControllers\MenuManagement;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\MenuItems;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        //pull all menu items
        $menuItems = MenuItems::orderByDesc('updated_at')->get();
        return response()->json(['menu_items' => $menuItems], 200);
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
        try {
            //Check if item has children items for reoder
            if(count($request->childItems)>0){
                $childItems = $this->filterArrayByKeys($request->childItems, ['id','order_id']);
                DB::beginTransaction();
                foreach ($childItems as $child) {
                    DB::table('menu_items')
                        ->where('id', '=', $child['id'])
                        ->update(['order_id' => $child['order_id']  // update your field(s) here
                        ]);
                }
                DB::commit();
            }

            //Check for item id. If id is present update if non create
            $itemId = array_key_exists("id",$request->data)?$request->data['id']:null;
            $navItem = new MenuItems();
            $search = MenuItems::find($itemId);

            if(MenuItems::find($itemId) === null){
                //Use update or create method
                $navItem = MenuItems::create($request->data);
            }else{
                //Use update or create method
                $navItem = MenuItems::updateOrCreate(['id'=>$itemId],$request->data);
            }

            //if item id is null then add created by else only update last updated by
            if($itemId == null) {
                $navItem->created_by = Auth::id();
            }
            $navItem->last_updated_by =Auth::id();
            $navItem->save();
            return response()->json(['message' => ['type'=>'success']], 200);
        }catch (Throwable $e){
            return response()->json(['message' => ['type'=>'error','message'=>$e]], 200);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request): \Illuminate\Http\JsonResponse
    {
        //
        $item = MenuItems::where([['menu_category',"!=",'system'],['id','=',$request->id]])->delete();
        return response()->json(['message' => ['type'=>'success']], 200);
    }

    public function getMenuGroups(): \Illuminate\Http\JsonResponse
    {
        $menuGroups = MenuItems::where([['menu_type','=','group'],['status','=','active']])->get();
        return response()->json(['menu_groups'=>$menuGroups],200);
    }


    public function orderItems(Request $request): \Illuminate\Http\JsonResponse
    {
        $items = $this->filterArrayByKeys($request->all(), ['id','order_id']);
        DB::beginTransaction();
        foreach ($items as $item) {
            DB::table('menu_items')
                ->where('id', '=', $item['id'])
                ->update(['order_id' => $item['order_id']  // update your field(s) here
                ]);
        }
        DB::commit();
        return response()->json(['message' => ['type'=>'success']], 200);
    }
    //Provide nested object for navigation menu
    public function navigationCard(string $request_id = null): \Illuminate\Http\JsonResponse
    {
        //$UserMenus =  DB::table('user_has_menus')->where('user_id', Auth::user()->id)
//$UserMenus =  DB::table('user_has_menus')
//            ->join('menu_items', function (JoinClause $join)use ($request_id ){
//                $join->on('user_has_menus.menu_id', '=', 'menu_items.id')
//                    ->where('menu_items.parent_id', '=', $request_id );
//            })

$UserMenus =  DB::table('menu_items')
    ->where('parent_id', '=', $request_id )
            ->select('id','name as title','menu_type as type','description','menu_category as category','menu_url as url','menu_icon as icon','order_id','menu_image as image')
            ->orderBy('order_id', 'desc')
            ->get();
        return response()->json(['navigation_menu_items' => $UserMenus], 200);
    }

    //
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

    ///
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


    //Provide nested object for navigation menu
    public function navigationTree(string $id = null): \Illuminate\Http\JsonResponse
    {
        //$UserMenus =  DB::table('user_has_menus')->where('user_id', Auth::user()->id)->pluck('menu_id');
        //dd(Auth::user()->getAllPermissions('userRoles'));

        $permissions = Auth::user()->userPermissions()->pluck('name')->toArray();
        $UserMenus = [];
        if(in_array('ALL',$permissions)){
            $UserMenus =  DB::table('menu_items')->where('status','!=','Archived')->orderBy('order_id')->pluck('id');
        }else{
            $UserMenus =DB::table('user_has_menus')
                ->join('menu_items','user_has_menus.menu_id','menu_items.id')
                ->where('user_has_menus.user_id','=', Auth::id())
                ->where('menu_items.status','!=','Archived')
                ->get()
                ->pluck('menu_id');
        }

        $menus = New MenuItems();
        $treeArray = [];
        foreach ($UserMenus as $item) {
            error_log('$item -> '.$item);
            foreach ($menus->getTree($item) as $leaf){
                array_push($treeArray,$leaf);
            }
        }
        $treeArray = $this->unique_multidim_array($treeArray,'id');
        return response()->json(['navigation_menu_items' => $this->build_tree($treeArray)], 200);

        //pull all menu items
/*        $MenuTree = MenuItems::with('children')
            ->select('id','name as title','menu_type as type','menu_category as category','menu_url as url','menu_icon as icon','order_id')
            ->where('parent_id',$id)
            ->orderBy('order_id')
            ->get();
        return response()->json(['navigation_menu_items' => $MenuTree], 200);*/
    }
    //Get list of children
    public function childItems(string $id): \Illuminate\Http\JsonResponse
    {
        $childItems = MenuItems::where('parent_id','=',$id)->get(['id','name','order_id']);
        return response()->json(['childItems'=>$childItems],200);
    }

    public function filterArrayByKeys(array $input, array $column_keys): array
    {
        $result      = array();
        $column_keys = array_flip($column_keys); // getting keys as values
        foreach ($input as $key => $val) {
            // getting only those key value pairs, which matches $column_keys
            $result[$key] = array_intersect_key($val, $column_keys);
        }
        return $result;
    }


}
