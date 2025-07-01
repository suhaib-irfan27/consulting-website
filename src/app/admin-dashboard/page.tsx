'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@components/Navbar';

export default function AdminDashboard() {
    const [admin, setAdmin] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await fetch('/api/me', { credentials: 'include' });
                if (!res.ok) throw new Error();
                const data = await res.json();

                if (data.user?.role !== 'admin') throw new Error(); // ✅ fix here

                setAdmin(data.user); // ✅ store the actual user
            } catch {
                router.push('/admin-login');
            } finally {
                setLoading(false);
            }
        };
        verify();
    }, [router]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <>

            <main className="min-h-screen p-10 bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {admin?.first_name || 'Admin'}!</h1>
                <p className="mt-4 text-gray-600">
                    This is your dashboard. Manage clients, view reports, and more.
                </p>
            </main>
        </>
    );
}







// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Navbar from '@components/Navbar';

// export default function AdminDashboard() {
//     const [admin, setAdmin] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const verify = async () => {
//             try {
//                 const res = await fetch('/api/me', { credentials: 'include' });
//                 if (!res.ok) throw new Error();
//                 const data = await res.json();
//                 if (data.role !== 'admin') throw new Error();
//                 setAdmin(data);
//             } catch {
//                 router.push('/admin-login');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         verify();
//     }, [router]);

//     if (loading) return <div className="text-center mt-10">Loading...</div>;

//     return (
//         <>
//             <Navbar />
//             <main className="min-h-screen p-10 bg-gray-100">
//                 <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin!</h1>
//                 <p className="mt-4 text-gray-600">This is your dashboard. Manage clients, view reports, and more.</p>
//             </main>
//         </>
//     );
// }
