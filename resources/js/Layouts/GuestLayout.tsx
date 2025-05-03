import ApplicationLogo from "@/Components/ApplicationLogo";
import { ReactNode } from "react";
import { PropsWithChildren } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { Link } from "@inertiajs/react";
import { Home } from "lucide-react";

function NavLink({
    children,
    href,
    active = false,
}: {
    children: ReactNode;
    href: string;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex items-center text-sm font-medium transition-colors ${
                active
                    ? "text-cash-red border-b-2 border-cash-red"
                    : "text-gray-600 hover:text-cash-red"
            }`}
        >
            {children}
        </Link>
    );
}

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col space-y-6">
                {/* Header */}
                <header className="bg-white shadow-sm border-t-4 border-cash-red">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-center items-center">
                        <nav className="flex items-center space-x-6">
                            <NavLink href="/" active={true}>
                                <Home size={18} className="mr-1" />
                                Home
                            </NavLink>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-6xl w-full flex-grow">
                    {children}
                </main>

                <footer className="bg-white border-t mt-auto">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <p className="text-center text-sm text-gray-500">
                            © {new Date().getFullYear()} CASH Assurances. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
            <Toaster />
        </>
    );
}
