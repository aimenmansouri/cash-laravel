<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use App\Models\Employee;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Symfony\Component\CssSelector\Node\FunctionNode;

class PhoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function publicIndex()
    {
        return Inertia::render(component: "Public/Phones/Index");
    }

    public function index()
    {
        $employees = Employee::with('phone')->get();
        return Inertia::render(component: "Phones/Index", props: ['employees' => $employees]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function assign(Request $request)
    {
        $validated = $request->validate([
            'emp_id' => 'required|exists:employees,id',
            'phone_number'  => 'nullable|string|max:3',
        ]);

        $existingPhone = Phone::where('phone_number', $validated['phone_number'])->first();
        if ($existingPhone) {
            return response()->json([
                'message' => 'This phone number is already assigned to another employee.',
            ], 400);
        }

        $employee = Employee::find($validated['emp_id']);

        //check if emploee have phone number and delete if so

        if ($employee->phone) {
            $employee->phone->delete();
        }

        // assign phone

        $employee->phone()->create([
            'phone_number' => $validated['phone_number']
        ]);

        return response()->json([
            'message' => 'phone number assigned to employee',
        ], 200);
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
    public function show(Phone $phone)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Phone $phone)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Phone $phone)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Phone $phone)
    {
        //
    }
}
