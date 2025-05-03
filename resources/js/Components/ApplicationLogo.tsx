import { SVGAttributes } from "react";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/CASH_Assurances_Logo.svg"
            alt="CASH Assurances"
            className="w-16"
        />
    );
}
