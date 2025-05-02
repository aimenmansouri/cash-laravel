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
import { Input } from "@/Components/ui/input";

import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
interface IndexInterface {
    employees: Employee[];
}

export default function Index({ employees = [] }: IndexInterface) {
    const assignPhone = async (phone_number: string, emp_id: number) => {
        console.log({ phone_number, emp_id });
        router.post(route("dashboard.phones.assign"), { phone_number, emp_id });
    };
    const removePhone = async (phoneId: number) => {
        console.log(phoneId);
    };

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
                                <TableHead>Phone number</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead className="text-center w-48">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((emp) => (
                                <TableRow key={emp.id}>
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
                                        <div className="flex space-x-3">
                                            <Input
                                                defaultValue={
                                                    emp.phone
                                                        ? emp.phone.phone_number
                                                        : ""
                                                }
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        const inputValue =
                                                            e.target.value;

                                                        assignPhone(
                                                            inputValue,
                                                            emp.id
                                                        );
                                                    }
                                                }}
                                            ></Input>
                                            <Button
                                                disabled={!emp.phone}
                                                variant={"destructive"}
                                                onClick={() => {
                                                    if (emp.phone)
                                                        removePhone(
                                                            emp.phone?.id
                                                        );
                                                }}
                                            >
                                                Phone <Trash />
                                            </Button>
                                        </div>
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
