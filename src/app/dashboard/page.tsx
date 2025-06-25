'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await fetch('/api/me', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!res.ok) throw new Error('Unauthorized');

                const data = await res.json();
                setUser(data);
            } catch (err) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [router]);

    if (loading) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.first_name || 'Client'}!</h1>
            <p className="mt-4 text-gray-600">This is your dashboard. More features coming soon!</p>
        </div>
    );
}
