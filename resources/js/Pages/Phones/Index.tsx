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

import { useToast } from "@/hooks/use-toast";
interface IndexInterface {
    employees: Employee[];
}

export default function Index({ employees = [] }: IndexInterface) {
    const { toast } = useToast();

    const assignPhone = async (phone_number: string, emp_id: number) => {
        router.post(
            route("dashboard.phones.assign"),
            { phone_number, emp_id },
            {
                onSuccess: (message) => {
                    console.log(message);
                    toast({ description: "Phone assigned successfully" });
                },
                onError: (errors) => {
                    if (errors.phone_number) {
                        toast({
                            variant: "destructive",
                            description: errors.phone_number,
                        });
                    } else {
                        toast({
                            variant: "destructive",
                            description: "Failed to assign phone number",
                        });
                    }
                    console.error("Failed to assign phone", errors);
                },
                preserveScroll: true,
            }
        );
    };
    const removePhone = async (phone_id: number) => {
        router.delete(route("dashboard.phones.destroy"), {
            data: { phone_id },
            onSuccess: () => {
                toast({ description: "Phone removed successfully" });
            },
            onError: (errors) => {
                if (errors.phone_id) {
                    toast({
                        variant: "destructive",
                        description: errors.phone_number,
                    });
                } else {
                    toast({
                        variant: "destructive",
                        description: "Failed to assign phone number",
                    });
                }
                console.error("Failed to assign phone", errors);
            },
            preserveScroll: true,
        });
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
                                <TableHead className="text-center w-52">
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
                                                onClick={() =>
                                                    emp.phone &&
                                                    removePhone(emp.phone.id)
                                                }
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
