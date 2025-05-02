import { Link } from "@inertiajs/react";

interface NavLinkInterface {
    href: string;
    name: string;
}

const NavLink = ({ href, name }: NavLinkInterface) => {
    return (
        <Link href={href}>
            <span className="text-blue-500 hover:underline">{name}</span>
        </Link>
    );
};

export const navLinks: NavLinkInterface[] = [
    { name: "Phones", href: "/phones" },
];

export default function Welcome() {
    return (
        <div className="flex h-screen items-center">
            <div className="flex-1">
                <img
                    className="h-1/2 w-1/2 mx-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/4/41/CASH_Assurances_Logo.svg"
                    alt=""
                />
                <div className="flex justify-center mt-3">
                    <span className=" text-lg font-bold">
                        Direction Régionale Annaba
                    </span>
                </div>
                <div className="mx-auto space-x-3 flex w-fit mt-6">
                    {navLinks.map((link) => {
                        return <NavLink href={link.href} name={link.name} />;
                    })}
                </div>
            </div>
        </div>
    );
}
