<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Http;

class attendanceController extends Controller
{
    public function index()
    {
        return Inertia::render("HR/Attendance/Index");
    }

    public function get(Request $request)
    {
        $agencies_dict = ['00500' => '192.168.50.201'];

        $request->validate([
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'agency_code' => ['required', Rule::in(array_keys($agencies_dict))],
        ]);

        $deviceIp = $agencies_dict[$request->agency_code];

        $usersUrl = env('FLASK_URL') . '/api/attendance/get-users';
        $attsUrl = env('FLASK_URL') . '/api/attendance/get-attendance';

        $users_res = Http::get($usersUrl, [
            'device_ip' => $deviceIp,
        ]);

        if ($users_res->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve users from the Flask server',
            ], 500);
        }

        $atts_res = Http::get($attsUrl, [
            'device_ip' => $deviceIp,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        if ($atts_res->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve attendance from the Flask server',
            ], 500);
        }

        $users = json_decode($users_res->body(), true)['users'];
        $attendances = json_decode($atts_res->body(), true)['attendance'];

        $userMap = [];
        foreach ($users as $user) {
            $userMap[$user['user_id']] = $user;
        }

        $mergedAttendance = [];
        foreach ($attendances as $att) {
            $user_id = $att['user_id'];
            if (isset($userMap[$user_id])) {
                $mergedAttendance[] = array_merge($att, $userMap[$user_id]);
            } else {
                // Optionally handle attendance with no matching user
                $mergedAttendance[] = $att + ['name' => 'Unknown User'];
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Data retrieved successfully',
            'data' =>  json_encode($mergedAttendance, JSON_PRETTY_PRINT),
        ]);
    }


    public function get_users(Request $request)
    {
        $agencies_dict = ['00500' => '192.168.50.201'];

        $request->validate([
            'agency_code' => ['required', Rule::in(array_keys($agencies_dict))],
        ]);

        $deviceIp = $agencies_dict[$request->agency_code];

        $usersUrl = env('FLASK_URL') . '/api/attendance/get-users';

        $users_res = Http::get($usersUrl, [
            'device_ip' => $deviceIp,
        ]);

        if ($users_res->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve users from the Flask server',
            ], 500);
        }


        return response()->json([
            'success' => true,
            'message' => 'Data retrieved successfully',
            'data' =>  $users_res->body(),
        ]);
    }
    public function get_sheet(Request $request)
    {
        $agencies_dict = ['00500' => '192.168.50.201'];

        $request->validate([
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'agency_code' => ['required', Rule::in(array_keys($agencies_dict))],
        ]);

        $deviceIp = $agencies_dict[$request->agency_code];

        $usersUrl = env('FLASK_URL') . '/api/attendance/get-users';
        $attsUrl = env('FLASK_URL') . '/api/attendance/get-attendance';

        $users_res = Http::get($usersUrl, [
            'device_ip' => $deviceIp,
        ]);

        if ($users_res->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve users from the Flask server',
            ], 500);
        }

        $atts_res = Http::get($attsUrl, [
            'device_ip' => $deviceIp,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        if ($atts_res->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve attendance from the Flask server',
            ], 500);
        }

        $users = json_decode($users_res->body(), true)['users'];
        $attendances = json_decode($atts_res->body(), true)['attendance'];

        $userMap = [];
        foreach ($users as $user) {
            $userMap[$user['user_id']] = $user;
        }

        $mergedAttendance = [];
        foreach ($attendances as $att) {
            $user_id = $att['user_id'];
            if (isset($userMap[$user_id])) {
                $mergedAttendance[] = array_merge($att, $userMap[$user_id]);
            } else {
                $mergedAttendance[] = $att + ['name' => 'Unknown User'];
            }
        }


        $userIdToIndex = [];
        foreach ($users as $index => $user) {
            $userIdToIndex[$user['user_id']] = $index;
        }
        dd($users);
        dd($userIdToIndex);
        return $mergedAttendance;
    }
}
