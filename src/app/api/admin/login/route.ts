import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import dbConfig from '@/lib/dbConfig';

export async function POST(req: Request) {
    const body = await req.json();
    const { username, password } = body;

    try {
        const conn = await mysql.createConnection(dbConfig);

        const [rows]: any = await conn.execute(
            'SELECT * FROM admins WHERE username = ?',
            [username]
        );

        await conn.end();

        const admin = rows[0];

        if (!admin) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Password check here (assumes bcrypt hashed passwords)
        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            {
                id: admin.admin_id,
                role: 'admin',
                first_name: admin.first_name,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        const response = NextResponse.json({ message: 'Logged in' });
        response.cookies.set('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}






// // src/app/api/admin/login/route.ts
// // import { NextResponse } from 'next/server';
// // import db from '@lib/db';
// // import jwt from 'jsonwebtoken';
// // import bcrypt from 'bcryptjs';

// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';
// import dbConfig from '@/lib/dbConfig';



// export async function POST(req: Request) {
//     const { username, password } = await req.json();

//     const [rows] = await db.execute(
//         'SELECT * FROM admins WHERE username = ?',
//         [username]
//     );

//     const admin = Array.isArray(rows) && rows[0];
//     if (!admin || !(await bcrypt.compare(password, admin.password))) {
//         return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
//     }

//     const token = jwt.sign(
//         { id: admin.admin_id, role: 'admin', first_name: admin.first_name },
//         process.env.JWT_SECRET!,
//         { expiresIn: '1d' }
//     );

//     const response = NextResponse.json({ message: 'Success' });
//     response.cookies.set('token', token, { httpOnly: true });
//     return response;
// }
