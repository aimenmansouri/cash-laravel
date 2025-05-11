<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class LogWebsiteVisit
{
    public function handle(Request $request, Closure $next)
    {
        $route = $request->route();
        $routeName = $route?->getName() ?? 'unnamed';
        $url = $request->fullUrl();

        Log::info('Visitor accessed route', [
            'ip' => $request->ip(),
            'url' => $url,
            'route_name' => $routeName,
        ]);

        return $next($request);
    }
}
