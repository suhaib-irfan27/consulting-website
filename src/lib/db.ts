import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';

console.log('SSL_CA path:', process.env.SSL_CA);
console.log('DB_HOST:', process.env.DB_HOST);

export async function GET() {
    const token = (await cookies().get('token'))?.value;

    if (!token) {
        return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        if (decoded.role === 'admin') {
            const [rows]: any = await pool.execute(
                'SELECT admin_id, username FROM admins WHERE admin_id = ?',
                [decoded.admin_id]
            );

            if (!rows.length) throw new Error('Admin not found');
            return NextResponse.json({ ...rows[0], role: 'admin' });
        } else {
            const [rows]: any = await pool.execute(
                'SELECT client_id, username, first_name FROM clients WHERE client_id = ?',
                [decoded.client_id]
            );

            if (!rows.length) throw new Error('Client not found');
            return NextResponse.json({ ...rows[0], role: 'client' });
        }
    } catch (err) {
        console.error('❌ JWT/DB error:', err);
        return NextResponse.json({ message: 'Invalid token or database issue' }, { status: 401 });
    }
}





// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';

// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     ssl: {
//         ca: fs.readFileSync(path.resolve(process.cwd(), process.env.SSL_CA!)),
//         rejectUnauthorized: true, // ← set this to true for DigiCert
//     },
// });

// export default pool;














