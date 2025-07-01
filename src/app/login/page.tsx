'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // ✅ Add this

export default function Login() {
    const router = useRouter();
    const { setUser } = useAuth(); // ✅ Grab setUser

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', // ✅ Set cookies
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || 'Login failed');
                return;
            }

            // ✅ Get user info
            const meRes = await fetch('/api/me', {
                method: 'GET',
                credentials: 'include',
            });

            const meData = await meRes.json();

            if (meRes.ok && meData.user) {
                setUser(meData.user); // ✅ Set user in context
                router.push('/dashboard');
            } else {
                setError('Login succeeded but failed to load user info.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 text-black">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Client Login</h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        value={form.username}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}













// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//     const router = useRouter();

//     const [form, setForm] = useState({
//         username: '',
//         password: '',
//     });

//     const [error, setError] = useState('');

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         const res = await fetch('/api/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(form),
//         });

//         const data = await res.json();

//         if (res.ok) {
//             router.push('/dashboard');
//         } else {
//             setError(data.message || 'Login failed');
//         }
//     };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 text-black">
//             <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
//                 <h2 className="text-2xl font-bold text-center text-gray-800">Client Login</h2>

//                 {error && <p className="text-red-600 text-sm text-center">{error}</p>}

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Username</label>
//                     <input
//                         type="text"
//                         name="username"
//                         required
//                         value={form.username}
//                         onChange={handleChange}
//                         className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         required
//                         value={form.password}
//                         onChange={handleChange}
//                         className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 "
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700"
//                 >
//                     Log In
//                 </button>
//             </form>
//         </div>
//     );
// }
