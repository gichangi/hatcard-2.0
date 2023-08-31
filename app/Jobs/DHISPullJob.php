<?php

namespace App\Jobs;

use App\Models\DHISData;
use GuzzleHttp\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DHISPullJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private string $url = '';
    private string $username = '';
    private string $password = '';
    private string $periodid = '';
    /**
     * Create a new job instance.
     */
    public function __construct($url,$periodid,$username,$password)
    {
        $this->url = $url;
        $this->password =$password;
        $this->username = $username;
        $this->periodid = $periodid;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
        $dhis_data = $this->request($this->url,'gichangijohn','Gigi@123');
        if($dhis_data != null){
            $json_output = json_encode($dhis_data);
            //DB::table('dhis_data')->insert($dhis_data);
            DHISData::where('periodid', $this->periodid)->delete();
            foreach ($dhis_data as $row){
                $rows= DHISData::updateOrCreate($row);
                $rows->save();
            }
        }
        //convert data to json
    }
    function request($url, $username, $password)
    {
        //error_log($url);
        ini_set('max_execution_time', 180); //3 minutes
        try {
            $client = new Client();
            $res = $client->request('GET', $url, [
                'verify'=>false,
                'auth' => [$username, $password]
            ]);
            if($res->getStatusCode() === 200){
                $data_array = explode("\n", $res->getBody()->getContents());
                $cols =   array_map('strtolower', explode(",", $data_array[0]));
                $output = [];
                foreach ($data_array as $line_index => $line) {
                    if ($line_index > 0 && $line_index < sizeof($data_array)-1) { // I assume the the first line contains the column names.
                        $newLine = [];
                        $values = explode(',', $line);
                        foreach ($values as $col_index => $value) {
                            $newLine[$cols[$col_index]] = $value;
                        }
                        $output[] = $newLine;
                    }
                }
                //Returns array of arrays with data
                return $output;
            }
            return null;
        }catch (\Exception $e){
            error_log('dhis pull exception -> '.$e);
            return null;
        }
    }
}
