'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth(); // ✅ shared auth state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Admin login failed');
                return;
            }

            // ✅ Fetch user after successful login
            const meRes = await fetch('/api/me', { credentials: 'include' });
            const userData = await meRes.json();

            if (meRes.ok && userData.user?.role === 'admin') {
                setUser(userData.user);
                router.push('/admin-dashboard');
            } else {
                setError('Not authorized as admin.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-black">Admin Login</h2>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 text-sm font-medium text-black">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black"
                    />

                    <label className="block mb-2 text-sm font-medium text-black">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                        className="w-full px-4 py-2 border border-gray-300 rounded mb-6 text-black"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}











// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

// export default function AdminLogin() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();
//     const { setUser } = useAuth(); // 👈 from context

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         const res = await fetch('/api/admin/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//             // 🔥 Update context from /api/me after login
//             const meRes = await fetch('/api/me', { credentials: 'include' });
//             const userData = await meRes.json();
//             setUser(userData.user); // 👈 update shared auth state
//             router.push('/admin-dashboard');
//         } else {
//             setError(data.error || 'Login failed');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//                 <h2 className="text-2xl font-bold mb-6 text-center text-black">Admin Login</h2>

//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//                 <form onSubmit={handleSubmit}>
//                     <label className="block mb-2 text-sm font-medium text-black">Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black placeholder-gray-500"
//                         placeholder="Enter username"
//                     />

//                     <label className="block mb-2 text-sm font-medium text-black">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded mb-6 text-black placeholder-gray-500"
//                         placeholder="Enter password"
//                     />

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }





// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';


// export default function AdminLogin() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError('');

//         const res = await fetch('/api/admin/login', {

//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//             router.push('/admin-dashboard');
//         } else {
//             setError(data.error || 'Login failed');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
//                 <h2 className="text-2xl font-bold mb-6 text-center text-black">Admin Login</h2>

//                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//                 <form onSubmit={handleSubmit}>
//                     <label className="block mb-2 text-sm font-medium text-black">Username</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black placeholder-gray-500"
//                         placeholder="Enter username"
//                     />

//                     <label className="block mb-2 text-sm font-medium text-black">Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                         className="w-full px-4 py-2 border border-gray-300 rounded mb-6 text-black placeholder-gray-500"
//                         placeholder="Enter password"
//                     />

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }






