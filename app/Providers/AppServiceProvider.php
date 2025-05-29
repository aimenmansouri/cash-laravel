<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Set custom temp directory to storage/temp
        $tempDir = storage_path('temp');
        
        // Create directory if it doesn't exist
        if (!file_exists($tempDir)) {
            mkdir($tempDir, 0755, true);
        }
        
        // Set environment variables
        putenv('TMP=' . $tempDir);
        putenv('TEMP=' . $tempDir);
        putenv('TMPDIR=' . $tempDir);
        
        // Set PHP ini setting
        ini_set('sys_temp_dir', $tempDir);
        Vite::prefetch(concurrency: 3);
    }
}
