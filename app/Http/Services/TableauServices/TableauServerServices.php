<?php

namespace App\Http\Services\TableauServices;

use App\Http\Controllers\Controller;
use App\Models\AdminModels\BIPlatforms;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


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



/*    public function getCredentials($id): array
    {
        error_log('Tableau Signin start');
        $message=array("status"=>"error");
        try{
            $server = json_decode(BIPlatforms::all()->where('id','=',$id)->first()->pluck('config_json'));

            $url = $server->uri_prefix . '/auth/signin';
            error_log('Signin client start');
            $client = new Client([
                'base_uri' => $server->base_url,
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
                            'name' => $server->username,
                            'password' => $server->password,
                            'site' => [
                                'contentUrl' => $server->target_site,
                            ],
                        ],
                    ],
                ]);
                // process response and set $this->credentials
                if ($response->getStatusCode() === 200) {
                    $message=array("status"=>"success");
                    $credentials = json_decode((string) $response->getBody())->credentials;
                    return compact("message","credentials");
                }
                error_log("tableau sign_in success");
                $message=array("status"=>"error","message"=>"Error occurred during signin.");
                return compact("message");
            } catch (GuzzleException $e) {
                error_log($e);
                $message=array("status"=>"error","message"=>"Error occurred during signin. Kindly check the server configuration details.");
                return compact("message");
            }

        }catch(GuzzleException $e){
            error_log($e);
            $message=array("status"=>"error","message"=>"signin error. ".$e->getMessage()."");
            return compact("message");
        }
    }
   */ public function generateToken($id)
    {
        try{
            $server = BIPlatforms::find($id);
            $ip = gethostbyname(parse_url($server->base_url, PHP_URL_HOST));
            $client = new Client([
                'base_uri' => $server->base_url,
                'verify' => false
            ]);
            $url = $server->proxy.'/'.$server->base_url.'/trusted?'
                . 'username=' . $server->username
                . '&server='.$ip
                . '&target_site=' . $server->target_site;

            $response = $client->request('POST', $url, [
                'headers' => [
                    'Accept' => 'application/json',
                    'Origin' => 'http://'.$ip,
                ],
            ]);

            $message=array("status"=>"error");

            if ($response->getStatusCode() === 200) {
                $token=$response->getBody()->__toString();
                $message=array("status"=>"success","token"=>$token);
                return $message;
            }
            return $message;
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



    public function getWorkbooks($id){
        error_log('Started');
        try{
            $server = BIPlatforms::find($id);
            //$server = TableauConfigurations::all()->where('server_id','=',$id)->first();
            $server_config = json_decode($server['config_json']);


            $site_id=  $server_config->credentials->site->id;
            $token= $server_config->credentials->token;
            $api_url=$server_config->base_url.$server_config->uri_prefix;
            $base_url=$server_config->base_url;

            $url = $api_url
                . '/sites'
                . '/' . $site_id
                . '/workbooks?pageSize=1000';
            error_log('workbooks fetch start');
            $fetch_workbooks_response = $this->get_response($server_config->base_url,$url,$token,"Workbooks");
            error_log('workbooks fetch end');
            if($fetch_workbooks_response['message']["status"]=="error"){
                return response($fetch_workbooks_response);
            }
            $fetch_workbooks=$fetch_workbooks_response['response']['workbooks']->workbook;

            if(sizeof($fetch_workbooks)>=1){
                $projects=array();
                $workbooks=array();
                $views=array();
                foreach($fetch_workbooks as $record){
                    $key = array_search($record->project->id, array_column($projects, 'id'));
                    if($key === false){
                        array_push($projects,array("name"=>$record->project->name,"id"=>$record->project->id));
                    }
                }
                return response()->json(['message'=>['type'=>'success','projects'=>$projects],200]);

               // return response(["status"=>"success","message"=>"".json_encode(compact('projects')).""]);
            }else{
                return response(["status"=>"error","message"=>"Error has occurred during fetch of tableau resources"]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            $message=array("status"=>"error","message"=>"".$e->getMessage()."");
            return response(["status"=>"error","message"=>"".json_encode(compact('message')).""]);
        }

    }
    function getWorkbookViews($base_url,$api_url,$site_id,$token,$workbook_id,$project_id){
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



    public function fetchWorkbooks(Request $request){
       dd($request);
    }

    //Tableau Resources
    public function getProjects(Request $request){
        error_log('Started');
        try{
            $server = BIPlatforms::find($request->id);
            //$server = TableauConfigurations::all()->where('server_id','=',$id)->first();
            $server_config = json_decode($server['config_json']);

            $site_id=  $server_config->credentials->site->id;
            $token= $server_config->credentials->token;
            $api_url=$server_config->base_url.$server_config->uri_prefix;
            $base_url=$server_config->base_url;

            $url = $api_url
                . '/sites'
                . '/' . $site_id
                . '/workbooks?pageSize=1000';
            error_log('workbooks fetch start');
            $fetch_workbooks_response = $this->get_response($server_config->base_url,$url,$token,"Workbooks");
            error_log('workbooks fetch end');
            if($fetch_workbooks_response['message']["status"]=="error"){
                return response($fetch_workbooks_response);
            }
            $fetch_workbooks=$fetch_workbooks_response['response']['workbooks']->workbook;

            if(sizeof($fetch_workbooks)>=1){
                $projects=array();
                $workbooks=array();
                $views=array();
                foreach($fetch_workbooks as $record){
                    $key = array_search($record->project->id, array_column($projects, 'id'));
                    if($key === false){
                        array_push($projects,array("name"=>$record->project->name,"id"=>$record->project->id));
                    }
                }
                return response()->json(['message'=>['type'=>'success','projects'=>$projects],200]);

                // return response(["status"=>"success","message"=>"".json_encode(compact('projects')).""]);
            }else{
                return response(["status"=>"error","message"=>"Error has occurred during fetch of tableau resources"]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            $message=array("status"=>"error","message"=>"".$e->getMessage()."");
            return response(["status"=>"error","message"=>"".json_encode(compact('message')).""]);
        }
    }




















    /*    public function getTableauToken($id)
        {
            try{
                $server = TableauConfigurations::all()->where('server_id','=',$id)->first();
                $ip = gethostbyname(parse_url($server->base_url, PHP_URL_HOST));
                $client = new Client([
                    'base_uri' => $server->base_url,
                    'verify' => false
                ]);
                $url = $server->proxy.'/'.$server->base_url.'/trusted?'
                    . 'username=' . $server->username
                    . '&server='.$ip
                    . '&target_site=' . $server->target_site;

                $response = $client->request('POST', $url, [
                    'headers' => [
                        'Accept' => 'application/json',
                        'Origin' => 'http://'.$ip,
                    ],
                ]);

               $message=array("status"=>"error");

               if ($response->getStatusCode() === 200) {
                    $token=$response->getBody()->__toString();
                    $message=array("status"=>"success","token"=>$token);
                    return $message;
                }
                return $message;
            }catch(\Exception $e){
                return (["status"=>"error","message"=>" error token. ".$e->getMessage().""]);
            }


        }*/

/*    public function getWorkbooks($id){
        error_log('Started');
        try{
            $server = TableauConfigurations::all()->where('server_id','=',$id)->first();
            error_log('credentials start');
            $credentials=$this->sign_in($id);
            error_log('credentials end');
            if($credentials['message']["status"]=="error"){
                return response($credentials);
            }

            $site_id= $credentials['credentials']->site->id;
            $token= $credentials['credentials']->token;
            $api_url=$server->base_url.$server->uri_prefix;
            $base_url=$server->base_url;

            $url = $api_url
                . '/sites'
                . '/' . $site_id
                . '/workbooks?pageSize=1000';
            error_log('workbooks fetch start');
            $fetch_workbooks_response = $this->get_response($server->base_url,$url,$token,"Workbooks");
             error_log('workbooks fetch end');

            if($fetch_workbooks_response['message']["status"]=="error"){
                return response($fetch_workbooks_response);
            }
            $fetch_workbooks=$fetch_workbooks_response['response']['workbooks']->workbook;

            if(sizeof($fetch_workbooks)>=1){
                $projects=array();
                $workbooks=array();
                $views=array();
                foreach($fetch_workbooks as $record){
                    array_push($workbooks,array("name"=>$record->name,"id"=>$record->id,"content_url"=>$record->contentUrl,"project_id"=>$record->project->id));
                    $key = array_search($record->project->id, array_column($projects, 'id'));
                    if($key === false){
                        array_push($projects,array("name"=>$record->project->name,"id"=>$record->project->id));
                    }

                    $view_response =$this->getWorkbookViews($base_url,$api_url,$site_id,$token,$record->id,$record->project->id);
                    if($view_response['message']["status"]=="error"){
                        return response($view_response);
                    }
                    foreach( $view_response['views'] as $view){
                        array_push($views, $view);
                    }

                }

                return response(["status"=>"success","message"=>"".json_encode(compact('projects','workbooks','views')).""]);
            }else{
                return response(["status"=>"error","message"=>"Error has occurred during fetch of tableau resources"]);
            }
        }catch(\Exception $e){
            error_log('Request Exception: '.$e );
            $message=array("status"=>"error","message"=>"".$e->getMessage()."");
            return response(["status"=>"error","message"=>"".json_encode(compact('message')).""]);
        }

    }

    function getWorkbookViews($base_url,$api_url,$site_id,$token,$workbook_id,$project_id){
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
                $server = TableauConfigurations::all()->where('server_id','=',$server_id)->first();
                $credentials=$this->sign_in($server_id);
                if($credentials['message']["status"]=="error"){
                    return $credentials;
                }
                $site_id= $credentials['credentials']->site->id;
                $token= $credentials['credentials']->token;
                $views_url=$server->base_url.$server->uri_prefix.'/sites/'.$site_id."/views/".$view_id."/image";
                // preview image
                $client = new Client([
                    'base_uri' => $server->base_url,
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


    //Tableau Resources
    public function getTableauWorkbooks(Request $request){
        return $this->getWorkbooks($request->serverid);
    }*/

}
