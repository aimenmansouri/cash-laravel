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
interface AgencyCode {
    value: string;
    label: string;
}

const agencyCodes: AgencyCode[] = [
    { value: "AGC001", label: "Agency 001" },
    { value: "AGC002", label: "Agency 002" },
    { value: "AGC003", label: "Agency 003" },
    { value: "AGC004", label: "Agency 004" },
];

export default function Index() {
    const [formData, setFormData] = useState({
        start_date: "",
        end_date: "",
        agency_code: "",
    });

    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState<any>(null);

    const handleSubmitGetAtt = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route("hr.attendance.get"), {
                params: formData,
            });
            setResponseData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitGetSheet = async () => {
        setLoading(true);
        try {
            const response = await axios.get(route("hr.attendance.get_sheet"), {
                params: formData,
            });
            console.log("get sheet");
            console.log(response.data);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
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
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            agency_code: value,
                                        }))
                                    }
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
                                className="bg-[#185C37]"
                            >
                                <Sheet />
                                Get excel sheet
                            </Button>

                            <Button
                                onClick={handleSubmitGetAtt}
                                disabled={loading}
                            >
                                Get attendance
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Attendance Response</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {responseData ? (
                            <pre className="text-sm">
                                {JSON.stringify(responseData, null, 2)}
                            </pre>
                        ) : (
                            <p className="text-muted-foreground">No data yet</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </HRLayout>
    );
}
