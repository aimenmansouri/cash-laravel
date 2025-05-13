import HRLayout from "@/Layouts/HRLayout";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

import { Sheet } from "lucide-react";

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

import { Download } from "lucide-react";

interface AgencyCode {
    value: string;
    label: string;
}

const agencyCodes: AgencyCode[] = [{ value: "00500", label: "DR Annaba" }];

export default function Index() {
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        agency_code: "",
    });

    const [loading, setLoading] = useState(false);

    const [formData2, setFormData2] = useState({
        agency_code: "",
    });

    const [loading2, setLoading2] = useState(false);

    const [responseData, setResponseData] = useState<any>([]);
    const [users, setUsers] = useState<any>([]);
    const [search, setSearch] = useState<string>("");

    const filteredAtts = responseData.filter((att: any) => {
        const matchName = att.name.toLowerCase().includes(search.toLowerCase());
        const matchTimestamp = att.timestamp
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchName || matchTimestamp;
    });

    const handleSubmitGetAtt = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route("hr.attendance.get"), {
                params: formData,
            });
            setResponseData(JSON.parse(response.data.data));
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitGetUsers = async () => {
        setLoading2(true);
        try {
            const response = await axios.get(route("hr.attendance.get_users"), {
                params: formData2,
            });
            console.log("get sheet");
            setUsers(JSON.parse(response.data.data).users);
            console.log(JSON.parse(response.data.data).users);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading2(false);
        }
    };

    const setDate = (
        key: "start_date" | "end_date",
        date: Date | undefined
    ) => {
        setFormData((prev) => ({
            ...prev,
            [key]: date ? format(date, "yyyy-MM-dd") : "",
        }));
    };

    return (
        <HRLayout>
            <div className="container mx-auto py-6">
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Export excel</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Agency Code */}
                            <div className="flex flex-col space-y-1.5">
                                Agency Code
                                <Select
                                    value={formData2.agency_code}
                                    onValueChange={(value) => {
                                        setFormData2((prev) => ({
                                            ...prev,
                                            agency_code: value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select agency code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {agencyCodes.map((agency) => (
                                            <SelectItem
                                                key={agency.value}
                                                value={agency.value}
                                            >
                                                {agency.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                            <Button
                                onClick={handleSubmitGetUsers}
                                disabled={loading2}
                                className="bg-[#185C37]"
                            >
                                <Sheet />
                                Get excel sheet
                            </Button>
                        </div>
                        {users.length != 0 ? (
                            <Table>
                                <TableCaption>Attendance table</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">
                                            ID
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((i: any) => (
                                        <TableRow key={i.user_id}>
                                            <TableCell className="font-medium">
                                                {i.user_id}
                                            </TableCell>
                                            <TableCell>{i.name}</TableCell>
                                            <TableCell className="text-right">
                                                <Button>
                                                    <Download />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-muted-foreground text-center">
                                Select agency and click Get excel sheet to show
                                users
                            </p>
                        )}
                    </CardContent>
                </Card>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Attendance Form</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Start Date */}
                            <div className="flex flex-col space-y-1.5">
                                Start Date
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "pl-3 text-left font-normal w-full",
                                                !formData.start_date &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {formData.start_date ? (
                                                format(
                                                    new Date(
                                                        formData.start_date
                                                    ),
                                                    "PPP"
                                                )
                                            ) : (
                                                <span>Select date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                formData.start_date
                                                    ? new Date(
                                                          formData.start_date
                                                      )
                                                    : undefined
                                            }
                                            onSelect={(date) =>
                                                setDate("start_date", date)
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col space-y-1.5">
                                End Date
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "pl-3 text-left font-normal w-full",
                                                !formData.end_date &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {formData.end_date ? (
                                                format(
                                                    new Date(formData.end_date),
                                                    "PPP"
                                                )
                                            ) : (
                                                <span>Select date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={
                                                formData.end_date
                                                    ? new Date(
                                                          formData.end_date
                                                      )
                                                    : undefined
                                            }
                                            onSelect={(date) =>
                                                setDate("end_date", date)
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* Agency Code */}
                            <div className="flex flex-col space-y-1.5">
                                Agency Code
                                <Select
                                    value={formData.agency_code}
                                    onValueChange={(value) => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            agency_code: value,
                                        }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select agency code" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {agencyCodes.map((agency) => (
                                            <SelectItem
                                                key={agency.value}
                                                value={agency.value}
                                            >
                                                {agency.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                            <Button
                                onClick={handleSubmitGetAtt}
                                disabled={loading}
                            >
                                Get attendance
                            </Button>
                        </div>

                        {filteredAtts.length != 0 ? (
                            <>
                                <div className="w-1/2 mb-3">
                                    <label className="block text-sm font-medium mb-1">
                                        Search :
                                    </label>
                                    <Input
                                        placeholder="Filter by name and phone number ..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-full"
                                    />
                                </div>
                                <Table>
                                    <TableCaption>
                                        Attendance table
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">
                                                ID
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className="text-right">
                                                Time
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAtts.map((i: any) => (
                                            <TableRow key={i.timestamp}>
                                                <TableCell className="font-medium">
                                                    {i.user_id}
                                                </TableCell>
                                                <TableCell>{i.name}</TableCell>
                                                <TableCell className="text-right">
                                                    {i.timestamp}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </>
                        ) : (
                            <p className="text-muted-foreground text-center">
                                No data
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </HRLayout>
    );
}
