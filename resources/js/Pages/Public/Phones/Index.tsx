import { useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";

import Employee from "@/types/app/Employee";
import { Search, Phone, Building, User, Users, Filter } from "lucide-react";

interface indexProps {
    employees: Employee[];
}

export default function Index({ employees = [] }: indexProps) {
    const [filter, setFilter] = useState("");

    const filteredEmployees = employees.filter((employee) => {
        const matchFirstName = employee.first_name
            .toLowerCase()
            .includes(filter.toLowerCase());
        const matchLastName = employee.last_name
            .toLowerCase()
            .includes(filter.toLowerCase());

        return matchFirstName || matchLastName;
    });

    return (
        <Guest>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold mb-6">
                    Employee Phone Directory
                </h1>

                <div className="w-1/2">
                    <label className="block text-sm font-medium mb-1">
                        Search :
                    </label>
                    <Input
                        placeholder="Filter by first name..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="w-full"
                    />
                </div>

                <Table>
                    <TableCaption>Employee Phone Directory</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Workplace</TableHead>
                            <TableHead className="text-right">
                                Phone Number
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="font-medium">
                                        {employee.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-1" />{" "}
                                            {`${employee.first_name} ${employee.last_name}`}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {employee.department}
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        <div className="flex items-center">
                                            <Building className="w-4 h-4 mr-1" />{" "}
                                            {employee.workplace}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-cash-red font-bold text-right">
                                        {employee.phone ? (
                                            <div className="flex items-center justify-end">
                                                <Phone className="w-4 h-4 mr-1" />{" "}
                                                {employee.phone.phone_number}
                                            </div>
                                        ) : (
                                            "No phone"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="text-center py-4"
                                >
                                    No employees found matching your filters
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Guest>
    );
}
