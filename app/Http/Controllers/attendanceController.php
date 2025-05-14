<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Http;
use App\Models\Attendance;
use Carbon\Carbon;

class attendanceController extends Controller
{
    public function index()
    {
        return Inertia::render("HR/Attendance/Index");
    }

    public function syncAttendance(Request $request)
    {
        $agencies_dict = ['00500' => '192.168.50.201'];

        $request->validate([
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
            'start_date' => '1970-01-01',
            'end_date'   => '2100-01-01',
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
        $newRecordsCount = 0;
        foreach ($mergedAttendance as $att) {
            $timestamp = Carbon::createFromFormat('D, d M Y H:i:s \G\M\T', $att["timestamp"], 'GMT')
                ->toDateTimeString();

            $attendance = Attendance::firstOrCreate(
                ['att_uid' => $att["att_uid"]],
                [
                    'timestamp' => $timestamp,
                    'user_id'   => $att["user_id"],
                    'name'      => $att["name"],
                    'agency_code' => $request->agency_code,
                ]
            );

            if ($attendance->wasRecentlyCreated) {
                $newRecordsCount++;
            }
        }
        return response()->json([
            'success' => true,
            'message' => 'Data retrieved successfully',
            'newRecordsCount' => $newRecordsCount,
            'data' =>  json_encode($mergedAttendance, JSON_PRETTY_PRINT),
        ]);
    }

    public function get(Request $request)
    {
        $agencies_dict = ['00500' => '192.168.50.201'];

        $request->validate([
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date', 'after_or_equal:start_date'],
            'agency_code' => ['required', Rule::in(array_keys($agencies_dict))],
        ]);

        $attendance = Attendance::where('agency_code', $request->agency_code)
            ->whereDate('timestamp', '>=', $request->start_date)
            ->whereDate('timestamp', '<=', $request->end_date)
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Data retrieved successfully',
            'data' =>  json_encode($attendance, JSON_PRETTY_PRINT),
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
            'user_id' => ['required'],
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
