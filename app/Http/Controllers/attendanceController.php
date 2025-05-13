<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class attendanceController extends Controller
{
    public function index()
    {
        return Inertia::render("HR/Attendance/Index");
    }

    public function get(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Data retrieved successfully',
            'data' => $request->all()
        ]);
    }
    
    public function get_sheet(Request $request){
        dd($request->all());
    }
}
