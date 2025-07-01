'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    console.log('👤 Navbar user:', user); // ✅ DEBUG

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    console.log("🔍 Navbar user state:", user);

    return (
        <header className="bg-blue-900 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">NSR Consulting Solutions</h1>
                <nav className="space-x-4">
                    <Link href="/" className="hover:underline">Home</Link>
                    <Link href="#" className="hover:underline">Services</Link>
                    <Link href="#" className="hover:underline">About</Link>
                    <Link href="#" className="hover:underline">Contact</Link>

                    {!user ? (
                        <>
                            <Link href="/admin-login" className="hover:underline text-white font-semibold">Admin</Link>
                            <Link href="/register" className="hover:underline text-yellow-300 font-semibold">Register</Link>
                            <Link href="/login" className="font-semibold text-white hover:text-gray-300">Login</Link>
                        </>
                    ) : (
                        <>
                            {user.role === 'admin' && (
                                <Link href="/admin-dashboard" className="hover:underline text-white font-semibold">Admin Dashboard</Link>
                            )}
                            {user.role === 'client' && (
                                <Link href="/dashboard" className="hover:underline text-white font-semibold">Client Dashboard</Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}




// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

// export default function Navbar() {
//     const { user, logout } = useAuth();
//     const router = useRouter();

//     const handleLogout = async () => {
//         await logout();
//         router.push('/login');
//     };

//     return (
//         <header className="bg-blue-900 text-white px-6 py-4">
//             <div className="max-w-6xl mx-auto flex justify-between items-center">
//                 <h1 className="text-xl font-bold">NSR Consulting Solutions</h1>
//                 <nav className="space-x-4">
//                     <Link href="/" className="hover:underline">Home</Link>
//                     <Link href="#" className="hover:underline">Services</Link>
//                     <Link href="#" className="hover:underline">About</Link>
//                     <Link href="#" className="hover:underline">Contact</Link>

//                     {!user ? (
//                         <>
//                             <Link href="/admin-login" className="hover:underline text-white font-semibold">Admin</Link>
//                             <Link href="/register" className="hover:underline text-yellow-300 font-semibold">Register</Link>
//                             <Link href="/login" className="font-semibold text-white hover:text-gray-300">Login</Link>
//                         </>
//                     ) : (
//                         <>
//                             {user.role === 'admin' && (
//                                 <Link href="/admin-dashboard" className="hover:underline text-white font-semibold">Admin Dashboard</Link>
//                             )}
//                             {user.role === 'client' && (
//                                 <Link href="/dashboard" className="hover:underline text-white font-semibold">Client Dashboard</Link>
//                             )}
//                             <button
//                                 onClick={handleLogout}
//                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     );
// }






// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

// export default function Navbar() {
//     const { user, logout } = useAuth();
//     const router = useRouter();

//     const handleLogout = async () => {
//         await logout();
//         router.push('/login');
//     };

//     return (
//         <header className="bg-blue-900 text-white px-6 py-4">
//             <div className="max-w-6xl mx-auto flex justify-between items-center">
//                 <h1 className="text-xl font-bold">NSR Consulting Solutions</h1>
//                 <nav className="space-x-4">
//                     <Link href="/" className="hover:underline">Home</Link>
//                     <Link href="#" className="hover:underline">Services</Link>
//                     <Link href="#" className="hover:underline">About</Link>
//                     <Link href="#" className="hover:underline">Contact</Link>

//                     {!user ? (
//                         <>
//                             <Link href="/admin-login" className="hover:underline text-white font-semibold">Admin</Link>
//                             <Link href="/register" className="hover:underline text-yellow-300 font-semibold">Register</Link>
//                             <Link href="/login" className="font-semibold text-white hover:text-gray-300">Login</Link>
//                         </>
//                     ) : (
//                         <>
//                             {user.role === 'admin' && (
//                                 <Link href="/admin-dashboard" className="hover:underline text-white font-semibold">Admin Dashboard</Link>
//                             )}
//                             {user.role === 'client' && (
//                                 <Link href="/dashboard" className="hover:underline text-white font-semibold">Client Dashboard</Link>
//                             )}
//                             <button
//                                 onClick={handleLogout}
//                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     );
// }






// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext'; // ✅ import useAuth

// export default function Navbar() {
//     const { user, logout } = useAuth(); // ✅ use context
//     const router = useRouter();

//     const handleLogout = async () => {
//         await logout();  // ✅ call shared logout logic
//         router.push('/login');
//     };

//     return (
//         <header className="bg-blue-900 text-white px-6 py-4">
//             <div className="max-w-6xl mx-auto flex justify-between items-center">
//                 <h1 className="text-xl font-bold">NSR Consulting Solutions</h1>
//                 <nav className="space-x-4">
//                     <Link href="/" className="hover:underline">Home</Link>
//                     <Link href="#" className="hover:underline">Services</Link>
//                     <Link href="#" className="hover:underline">About</Link>
//                     <Link href="#" className="hover:underline">Contact</Link>

//                     {!user ? (
//                         <>
//                             <Link href="/admin-login" className="hover:underline text-white font-semibold">Admin</Link>
//                             <Link href="/register" className="hover:underline text-yellow-300 font-semibold">Register</Link>
//                             <Link href="/login" className="font-semibold text-white hover:text-gray-300">Login</Link>
//                         </>
//                     ) : (
//                         <>
//                             {user.role === 'admin' && (
//                                 <Link href="/admin-dashboard" className="hover:underline text-white font-semibold">Admin Dashboard</Link>
//                             )}
//                             <button
//                                 onClick={handleLogout}
//                                 className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
//                             >
//                                 Logout
//                             </button>
//                         </>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     );
// }










