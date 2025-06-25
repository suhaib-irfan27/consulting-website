// src/components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
    return (
        <header className="bg-blue-900 text-white px-6 py-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">NSR Consulting Solutions</h1>
                <nav className="space-x-4">
                    <Link href="#" className="hover:underline">Home</Link>
                    <Link href="#" className="hover:underline">Services</Link>
                    <Link href="#" className="hover:underline">About</Link>
                    <Link href="/register" className="hover:underline text-yellow-300 font-semibold">Register</Link>
                    <Link href="/login" className="font-semibold text-white hover:text-gray-300">Login</Link>
                    <Link href="#" className="hover:underline">Contact</Link>
                </nav>
            </div>
        </header>
    );
}
