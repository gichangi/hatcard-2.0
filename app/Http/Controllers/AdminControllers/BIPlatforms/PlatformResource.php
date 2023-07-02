<?php

    namespace App\Http\Controllers\AdminControllers\BIPlatforms;
    use Illuminate\Http\Resources\Json\JsonResource;

    class PlatformResource extends JsonResource
    {
        public function toArray($request): array
        {
            if (isset($this['config_json'])){
                if(isset($this['config_json']->credentials)){
                    $this['config_json']->credentials = null;
                }
            }
            return (array) $this;
        }
    }
