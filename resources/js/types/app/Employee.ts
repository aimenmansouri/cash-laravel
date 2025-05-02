import Phone from "./phone";

export default interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    workplace: string;
    department?: string | null;
    phone?: Phone;
    created_at: string;
    updated_at: string;
}
