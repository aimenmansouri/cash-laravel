import { FormEvent, ChangeEvent, useState } from 'react';
import { router } from '@inertiajs/react';

interface EmployeeForm {
  first_name: string;
  last_name: string;
  workplace: string;
  department: string;
  phone_number: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateEmployee() {
  const [form, setForm] = useState<EmployeeForm>({
    first_name: '',
    last_name: '',
    workplace: '',
    department: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(route("employees.store"), form);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {(Object.keys(form) as (keyof EmployeeForm)[]).map((field) => (
          <div key={field}>
            <label className="block capitalize">{field.replace('_', ' ')}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="border p-2 w-full"
            />
            {errors[field] && (
              <div className="text-red-500 text-sm">{errors[field]}</div>
            )}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
