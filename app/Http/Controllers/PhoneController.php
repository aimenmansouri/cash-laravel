<?php

namespace App\Http\Controllers;

use App\Models\Phone;
use App\Models\Employee;
use Illuminate\Http\Request;

use Inertia\Inertia;

class PhoneController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function publicIndex()
    {
        $employees = Employee::orderBy('workplace')->orderBy('first_name')->with('phone')->get();
        return Inertia::render(component: "Public/Phones/Index", props: ['employees' => $employees]);
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
            'phone_number'  => 'required|string|max:3',
        ]);

        $existingPhone = Phone::where('phone_number', $validated['phone_number'])->first();
        if ($existingPhone) {

            return redirect()->back()
                ->withErrors(['phone_number' => 'This phone number is already assigned to another employee.'])
                ->withInput();
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

        redirect()->back()->with([
            'message' => 'phone number assigned to employee',
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
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'phone_id' => 'required|exists:phones,id',
        ]);
        $phone = Phone::findOrFail($validated['phone_id']);
        $phone->delete();
        return redirect()->back()->with('success', 'Phone number removed successfully');
    }
}
