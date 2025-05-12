<?php


namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HROnly
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if (!$user || ($user->type !== 'hr' || $user->type !== 'admin')) {
            abort(403, 'Access denied – HR only.');
        }

        return $next($request);
    }
}
