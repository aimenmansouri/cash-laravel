import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Alert, AlertDescription } from "@/Components/ui/alert";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function CreateUserForm() {
    // Define form using Inertia's useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: "",
        last_name: "",
        workplace: "",
        department: "",
        phone_number: "",
    });

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Submit handler
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data);
        post(route("dashboard.employees.store"), {
            onSuccess: () => {
                reset();
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 5000);
            },
        });
    };

    const departments = [
        "IT department",
        "Marketing",
        "Sales",
        "Human Resources",
        "Finance",
        "Operations",
        "Customer Support",
        "Research & Development",
    ];

    const workplaces = [
        "00500",
        "D0501",
        "D0502",
        "D0503",
        "D0504",
        "D0505",
        "D0507",
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Employee
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {showSuccessMessage && (
                            <div className="mb-6">
                                <Alert className="bg-green-50 text-green-800 border-green-200">
                                    <AlertDescription>
                                        User has been created successfully!
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}

                        <Card>
                            <CardHeader>
                                <CardTitle>Create New User</CardTitle>
                                <CardDescription>
                                    Enter the details to create a new user
                                    record.
                                </CardDescription>
                            </CardHeader>

                            <div>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="first_name">
                                                First Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="first_name"
                                                value={data.first_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "first_name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter first name"
                                            />
                                            {errors.first_name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.first_name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="last_name">
                                                Last Name{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </Label>
                                            <Input
                                                id="last_name"
                                                value={data.last_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "last_name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter last name"
                                            />
                                            {errors.last_name && (
                                                <p className="text-red-500 text-sm mt-1">
                                                    {errors.last_name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="workplace">
                                            Workplace
                                        </Label>
                                        <Select
                                            value={data.workplace}
                                            onValueChange={(value) =>
                                                setData("workplace", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select workplace" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {workplaces.map((workplace) => (
                                                    <SelectItem
                                                        key={workplace}
                                                        value={workplace}
                                                    >
                                                        {workplace}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.workplace && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.workplace}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="department">
                                            Department
                                        </Label>
                                        <Select
                                            value={data.department}
                                            onValueChange={(value) =>
                                                setData("department", value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">
                                                    None
                                                </SelectItem>
                                                {departments.map((dept) => (
                                                    <SelectItem
                                                        key={dept}
                                                        value={dept}
                                                    >
                                                        {dept}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.department && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.department}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone_number">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone_number"
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_number",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter phone number"
                                            maxLength={3}
                                        />
                                        {errors.phone_number && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.phone_number}
                                            </p>
                                        )}
                                        <p className="text-gray-500 text-xs">
                                            Maximum 3 characters
                                        </p>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-between">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => reset()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={processing}
                                    >
                                        {processing
                                            ? "Creating..."
                                            : "Create User"}
                                    </Button>
                                </CardFooter>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
