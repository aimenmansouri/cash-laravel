<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

use App\Models\Phone;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function createForm() {
        return Inertia::render("Employees/Create");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'workplace'     => 'required|string|max:255',
            'department'    => 'nullable|string|max:255',
            'phone_number'  => 'nullable|string|max:3',
        ]);

        // Create employee
        $employee = Employee::create([
            'first_name' => $validated['first_name'],
            'last_name'  => $validated['last_name'],
            'workplace'  => $validated['workplace'],
            'department' => $validated['department'] ?? null,
        ]);

        // If phone number is provided
        if (!empty($validated['phone_number'])) {
            // Check if phone number is already assigned
            $existingPhone = Phone::where('phone_number', $validated['phone_number'])->first();

            if ($existingPhone && $existingPhone->employee_id !== null) {
                return response()->json([
                    'message' => 'This phone number is already assigned to another employee.',
                ], 400);
            }

            // Create or assign phone
            if ($existingPhone) {
                $existingPhone->employee_id = $employee->id;
                $existingPhone->save();
            } else {
                $employee->phone()->create([
                    'phone_number' => $validated['phone_number'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Employee created successfully',
            'employee' => $employee->load('phone'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
