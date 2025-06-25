import { NextResponse } from 'next/server';
import pool from '../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    const { username, password, first_name, last_name, email, phone } = await req.json();

    if (!username || !password || !first_name || !last_name || !email) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 👈 hash the password

        const [result] = await pool.query(
            `INSERT INTO Clients (username, password, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?, ?)`,
            [username, hashedPassword, first_name, last_name, email, phone]
        );

        return NextResponse.json({ message: '✅ Registered successfully' });
    } catch (err: any) {
        return NextResponse.json({ message: '❌ Error: ' + err.message }, { status: 500 });
    }
}




// import { NextResponse } from 'next/server';
// import pool from '../../lib/db';

// export async function POST(req: Request) {
//     const { username, password, first_name, last_name, email, phone } = await req.json();

//     if (!username || !password || !first_name || !last_name || !email) {
//         return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
//     }

//     try {
//         const [result] = await pool.query(
//             `INSERT INTO clients (username, password, first_name, last_name, email, phone) VALUES (?, ?, ?, ?, ?, ?)`,
//             [username, password, first_name, last_name, email, phone]
//         );

//         return NextResponse.json({ message: '✅ Registered successfully' });
//     } catch (err: any) {
//         return NextResponse.json({ message: '❌ Error: ' + err.message }, { status: 500 });
//     }
// }
