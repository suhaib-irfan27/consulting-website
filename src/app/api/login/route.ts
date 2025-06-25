// File: /app/api/login/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../../lib/db';


export async function POST(req: NextRequest) {
    const { username, password } = await req.json();
    let conn;

    try {
        conn = await pool.getConnection();

        const [rows]: any = await conn.execute(
            'SELECT client_id, username, password FROM clients WHERE username = ?',
            [username]
        );

        if (!rows.length) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { client_id: user.client_id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        const res = NextResponse.json({ message: 'Login successful' });
        res.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'strict',
            maxAge: 3600,
        });

        return res;
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    } finally {
        if (conn) conn.release();
    }
}
