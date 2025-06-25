'use client';
import { useState } from 'react';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        alert(data.message);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                {['username', 'password', 'first_name', 'last_name', 'email', 'phone'].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
                            {field.replace('_', ' ')}
                        </label>
                        <input
                            id={field}
                            name={field}
                            type={field === 'password' ? 'password' : 'text'}
                            value={form[field as keyof typeof form]}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full rounded-md bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
