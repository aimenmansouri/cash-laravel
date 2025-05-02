import ApplicationLogo from "@/Components/ApplicationLogo";
import { ReactNode } from "react";
import { PropsWithChildren } from "react";
import { Toaster } from "@/Components/ui/toaster";
import { Link } from "@inertiajs/react";
import { Home } from "lucide-react";

interface NavLinkInterface {
    href: string;
    name: string;
}

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

const navLinks: NavLinkInterface[] = [{ name: "Phones", href: "/phones" }];

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-t-4 border-cash-red">
                    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <h1 className="text-xl font-semibold text-gray-800">
                                Employee Portal
                            </h1>
                        </div>
                        <nav className="flex items-center space-x-6">
                            <NavLink href="/" active={true}>
                                <Home size={18} className="mr-1" />
                                Home
                            </NavLink>
                            <NavLink href="/phone" active={false}>
                                Phone Directory
                            </NavLink>
                            <NavLink href="/employees" active={false}>
                                Employee Info
                            </NavLink>
                        </nav>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-6xl mx-auto px-4 py-8">
                    {/* This is where your actual page content will be rendered */}
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t mt-auto">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <p className="text-center text-sm text-gray-500">
                            © {new Date().getFullYear()} Your Company. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
            <Toaster />
        </>
    );
}
