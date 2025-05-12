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

        if (!$user) {
            abort(403, 'Access denied – HR only.');
        }

        if ($user->type === 'admin' || $user->type === 'hr') {
            return $next($request);
        }

        abort(403, 'Access denied – HR only.');
    }
}
