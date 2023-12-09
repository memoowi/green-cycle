<?php

namespace App\Http\Middleware;

use App\Models\Business;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BanBusinessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        // Check if the user is associated with a banned business
        if ($user && Business::where('user_id', $user->id)->where('is_ban', 1)->exists()) {
            return redirect()->route('business.banned-business');
        }
        return $next($request);
    }
}
