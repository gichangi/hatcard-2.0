<?php

namespace App\Console\Commands;

use App\Http\Controllers\VSPControllers\DHISController;
use Illuminate\Console\Command;

class FetchDHISData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-d-h-i-s-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $dhisController = new DHISController();
        return $dhisController->fetchAllData();
    }
}
