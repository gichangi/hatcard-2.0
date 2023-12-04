<?php

namespace App\Http\Services\TableauServices;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\BIDashboards;
use App\Models\AdminModels\BIPlatforms;
use App\Models\DataModels\DHISData;
use App\Models\TableauToken;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use Throwable;


class TableauServerServices extends Controller
{
    public function credentialCheck(Request $request){
        $credentials = $this->getCredentials($request);
        if($credentials['message']['type'] === 'success'){
            return response()->json(['message'=>['type'=>'success']],200);
        }
        return response()->json(['message'=>['type'=>'error'],200]);
    }

    public function getCredentials($request): array
    {
        error_log('Tableau credentialCheck start');
        try{
            $url = $request->uri_prefix . '/auth/signin';
            error_log('Signin client start');
            $client = new Client([
                'base_uri' => $request->base_url,
                'verify' => false
            ]);

            try {

                $response = $client->request('POST', $url, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Content-Type' => 'application/json'
                    ],
                    'json' => [
                        'credentials' => [
                            'name' => $request->username,
                            'password' => $request->password,
                            'site' => [
                                'contentUrl' => $request->target_site,
                            ],
                        ],
                    ],
                ]);

                // process response and set $this->credentials
                if ($response->getStatusCode() === 200) {
                    error_log("tableau credential check success");
                   // return response()->json(['message'=>['type'=>'success']],200);
                    $message=array("type"=>"success");
                    $credentials = json_decode((string) $response->getBody())->credentials;
                    return compact("message","credentials");

                }
                error_log("tableau credential check error");
                $message=array("type"=>"error","message"=>"Error occurred during signin.");
                return compact("message");

            } catch (GuzzleException $e) {
                error_log($e);
                $message=array("type"=>"error","message"=>$e);
                return compact("message");
            }

        }catch(GuzzleException $e){
            error_log($e);
            $message=array("type"=>"error","message"=>$e);
            return compact("message");
        }
    }


    public function generateToken($id): array
    {

        try{
            $currentToken = TableauToken::where('server_id','=',$id)->get();
//            $remainingBoostHours = 5;
//            if(sizeof($currentToken) === 1){
//                $now = \Carbon\Carbon::now();
//                $endDate = \Carbon\Carbon::parse($currentToken[0]['updated_at']);
//                $remainingBoostHours = $now->diffInHours($endDate);
//            }

//            if($remainingBoostHours  > 4 ){
                $server = BIPlatforms::find($id);
                $ip = gethostbyname(parse_url($server->base_url, PHP_URL_HOST));
                $server_config = json_decode($server['config_json']);

                $client = new Client([
                    'base_uri' => $server->base_url,
                    'verify' => false
                ]);

                $url = $server_config->proxy.'/'.$server->base_url.'/trusted?'
                    . 'username=' . $server_config->username
                    . '&server='.$ip
                    . '&target_site=' . $server_config->target_site;

                $response = $client->request('POST', $url, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Origin' => 'http://'.$ip,
                    ],
                ]);

                $message=array("status"=>"error");

                if ($response->getStatusCode() === 200) {
                    $token=$response->getBody()->__toString();
                    $tokenStore = TableauToken::updateOrCreate(
                        [
                            'server_id' => $id,
                        ],
                        [ 'token' => $token]
                    );
                    $tokenStore->save();

                    return array("status"=>"success","token"=>$token);
                }
                return $message;
//            }else{
//                return array("status"=>"success","token"=>$currentToken[0]['token']);
//            }

        }catch(\Exception $e){
            return (["status"=>"error","message"=>" error token. ".$e->getMessage().""]);
        }
    }

    protected function get_response($base_url,$url, $token,$fetch_resource)
    {
        error_log('get_response started');
        error_log('client_create started');
        $client = new Client([
            'base_uri' => $base_url,
            'verify' => false
        ]);
        error_log('client_create end');
        $message=array();
        try{
            error_log('get_response start');
            $get_responses = $client->request('GET', $url, [
                'headers' => [
                    'Accept' => 'application/json',
                    'X-Tableau-auth' => $token,
                ],
            ]);

            if ($get_responses->getStatusCode() === 200) {

                $message=array("status"=>"success");
                $response = (array)json_decode($get_responses->getBody());
                return compact("message","response");


            }
            error_log('get_response end');
            $message=array("status"=>"error","message"=>"Error occurred fetch of ".$fetch_resource);

            return compact("message");
        }catch (\Exception $e) {
            error_log('error 3');
            $message=array("status"=>"error","message"=>$fetch_resource." error. ".$e->getMessage()."");
            return compact("message");
        }
    }

    function getWorkbookViews2($base_url,$api_url,$site_id,$token,$workbook_id,$project_id){
        $message=array("status"=>"error","message"=>"Error occurred during fetch of workbook views.");
        $url = $api_url
            . '/sites'
            . '/' . $site_id
            . '/workbooks'
            . '/' . $workbook_id
            . '/views';
        $view_response = $this->get_response($base_url,$url,$token,"Workbook Views");

        if($view_response['message']["status"]=="error"){
            return $view_response;
        }
        $views=array();
        if(sizeof($view_response['response']['views']->view)>=1){
            foreach($view_response['response']['views']->view as $record){
                array_push($views,array("name"=>$record->name,"id"=>$record->id,"content_url"=>$record->contentUrl,"workbook_id"=>$workbook_id,"project_id"=>$project_id));
            }
            $message=array("status"=>"success");
            return compact('message','views');
        }

        return compact('message');
    }

    public function get_preview_image($server_id,$view_id)
    {
        try{
            error_log('Preview Image Start' );
            $image ="No Image Preview";
            $server = BIPlatforms::find($server_id);
            $server_config = json_decode($server['config_json']);

            $site_id= $server_config->credentials->site->id;
            $token= $server_config->credentials->token;
            $views_url=$server_config->base_url.$server_config->uri_prefix.'/sites/'.$site_id."/views/".$view_id."/image";
            // preview image
            $client = new Client([
                'base_uri' => $server_config->base_url,
                'verify' => false
            ]);
            try{
                $response = $client->request('GET', $views_url, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'X-Tableau-auth' => $token,
                    ],
                ]);
                error_log('Preview Image Stop' );
                if ($response->getStatusCode() === 200) {
                    $image = base64_encode($response->getBody());
                    $message=array("status"=>"success","image"=>$image );
                    return $message;
                }
                $message=array("status"=>"error","message"=>"Error Occured While Generating Image");
                return $message;
            }catch(\Exception $e){
                $message=array("status"=>"error","message"=>"".$e->getMessage()."");
                return $message;
            }

        }catch(\Exception $e){
            $message=array("status"=>"error","message"=>"".$e->getMessage()."");
            return compact("message");
        }
    }




    //Tableau Resources
    public function getProjects(Request $request): \Illuminate\Http\JsonResponse
    {
        error_log('Started fetching projects');
        try{
            $server = BIPlatforms::find($request->id);
            $server_config = json_decode($server['config_json']);
            $credentials = $this->getCredentials($server_config)['credentials'];
            $site_id=  $credentials->site->id;
            $token= $credentials->token;
            $api_url=$server_config->base_url.$server_config->uri_prefix;

            $url = $api_url
                . '/sites'
                . '/' . $site_id
                . '/projects?pageSize=1000';
            error_log('projects fetch start');
            $projects_response = $this->get_response($server_config->base_url,$url,$token,"Projects");

            if($projects_response['message']["status"]=="error"){
                return response()->json(['message'=>['type'=>'error','message'=>$projects_response['message']],200]);
            }else{
                return response()->json(['message'=>['type'=>'success','projects'=>$projects_response['response']['projects']->project],200]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            return response()->json(['message'=>['type'=>'error','message'=>$e->getMessage()],200]);
        }
    }

    //Get workbooks using both server id and projects
    public function getWorkbooks(Request $request): \Illuminate\Http\JsonResponse
    {
        error_log('Started fetching projects');
        try{
            $server = BIPlatforms::find($request->id);
            $server_config = json_decode($server['config_json']);
            $credentials = $this->getCredentials($server_config)['credentials'];
            $site_id=  $credentials->site->id;
            $token= $credentials->token;
            $api_url=$server_config->base_url.$server_config->uri_prefix;
            $project_filter = '';
            //get all if no project name provided
            if(isset($request->project)){
                $project_filter = '&filter=projectName:eq:'.$request->project;
            }
            $url = $api_url
                . '/sites'
                . '/' . $site_id
                . '/workbooks?pageSize=1000'
                .$project_filter
            ;
            error_log('workbooks fetch start');
            $workbooks_response = $this->get_response($server_config->base_url,$url,$token,"Workbooks");

            if($workbooks_response['message']["status"]=="error"){
                return response()->json(['message'=>['type'=>'error','message'=>$workbooks_response['message']],200]);
            }else{
                return response()->json(['message'=>['type'=>'success','workbooks'=>$workbooks_response['response']['workbooks']->workbook],200]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            return response()->json(['message'=>['type'=>'error','message'=>$e->getMessage()],200]);
        }
    }

    //Get workbooks using both server id and projects
    public function getWorkbookViews(Request $request): \Illuminate\Http\JsonResponse
    {
        error_log('Started fetching projects');
        try{
            $server = BIPlatforms::find($request->id);
            $server_config = json_decode($server['config_json']);
            $credentials = $this->getCredentials($server_config)['credentials'];
            $site_id=  $credentials->site->id;
            $token= $credentials->token;
            $api_url=$server_config->base_url.$server_config->uri_prefix;
            $url = $api_url
                . '/sites'
                . '/' . $site_id
                . '/workbooks'
                . '/' . $request->workbook
                . '/views';

            error_log('views fetch start');
            $views_response = $this->get_response($server_config->base_url,$url,$token,"Workbooks");

            if($views_response['message']["status"]=="error"){
                return response()->json(['message'=>['type'=>'error','message'=>$views_response['message']],200]);
            }else{
                return response()->json(['message'=>['type'=>'success','views'=>$views_response['response']['views']->view],200]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            return response()->json(['message'=>['type'=>'error','message'=>$e->getMessage()],200]);
        }
    }

    public function getViewImage(Request $request): \Illuminate\Http\JsonResponse
    {
        error_log('Started fetching projects');
        try{
            $server = BIPlatforms::find($request->id);
            $server_config = json_decode($server['config_json']);
            $credentials = $this->getCredentials($server_config)['credentials'];
            $site_id=  $credentials->site->id;
            $token= $credentials->token;
            $url = $server_config->base_url.$server_config->uri_prefix.'/sites/'.$site_id."/views/".$request->view."/image";
            // preview image
            $client = new Client([
                'base_uri' => $server_config->base_url,
                'verify' => false
            ]);
            try{
                $response = $client->request('GET', $url, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'X-Tableau-auth' => $token,
                    ],
                ]);
                if ($response->getStatusCode() === 200) {
                    $image = base64_encode($response->getBody());
                    return response()->json(['message'=>['type'=>'success','image'=>'data:image/png;base64,'.$image],200]);
                }else{
                    return response()->json(['message'=>['type'=>'error','message'=>"error occurred while fetching the image"],200]);
                }
            }catch(\GuzzleHttp\Exception\RequestException $e){
                return response()->json(['message'=>['type'=>'error','message'=>$e->getMessage()],200]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            return response()->json(['message'=>['type'=>'error','message'=>$e->getMessage()],200]);
        }
    }

    //Generate embedding url
    public function generateUrl(Request $request){

        try {
            $dashboard = BIDashboards::with('server')->where('id',$request->id)->get()->first();
            if($dashboard->dashboard_type === 'tableau_server'){
                $token=$this->generateToken($dashboard->server_uid);
                $server_config = json_decode($dashboard->server->config_json);
                $url=$server_config->base_url."/trusted/".$token['token']."/t/".$server_config->target_site."/views/".$dashboard->config_json->view_content_url."?:embed=yes&:toolbar=no";
                return response()->json(['message'=>['type'=>'success','url'=>$url],200]);
            }else if ($dashboard->dashboard_type === 'tableau_public'){
                return response()->json(['message'=>['type'=>'success','url'=>$dashboard->config_json->public_url],200]);
            }
            dd($dashboard);

        }catch (Throwable $e){
            return response()->json(["message"=>["type"=>"error","message"=>$e]],200);
        }
    }
}
