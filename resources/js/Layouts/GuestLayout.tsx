import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Toaster } from "@/Components/ui/toaster";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <div>{children}</div>
            <Toaster />
        </>
    );
}
