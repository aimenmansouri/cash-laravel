import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

import Employee from "@/types/app/Employee";

import { Button } from "@/Components/ui/button";

interface IndexInterface {
    employees: Employee[];
}

export default function Index({ employees = [] }: IndexInterface) {
    const assignPhone = (newPhone : string ) => {

    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Phones
                </h2>
            }
        >
            <Head title="Phones" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Table>
                        <TableCaption>
                            A list of employees with phone number.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone number</TableHead>
                                <TableHead className="text-right">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((emp) => (
                                <TableRow>
                                    <TableCell className="font-medium">{`${emp.first_name} ${emp.last_name}`}</TableCell>
                                    <TableCell>
                                        {emp.phone
                                            ? emp.phone.phone_number
                                            : "None"}
                                    </TableCell>
                                    <TableCell>
                                        {emp.department
                                            ? emp.department
                                            : "None"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        $250.00
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
