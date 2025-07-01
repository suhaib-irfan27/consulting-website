import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConfig from '@/lib/dbConfig';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();
    let conn;

    try {
        conn = await mysql.createConnection(dbConfig);

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
            {
                id: user.client_id,
                username: user.username,
                role: 'client', // ✅ include role
            },
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
        if (conn) await conn.end();
    }
}







// // File: /app/api/login/route.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import dbConfig from '@/lib/dbConfig';
// import mysql from 'mysql2/promise';

// export async function POST(req: NextRequest) {
//     const { username, password } = await req.json();
//     let conn;

//     try {
//         conn = await mysql.createConnection(dbConfig);

//         const [rows]: any = await conn.execute(
//             'SELECT client_id, username, password FROM clients WHERE username = ?',
//             [username]
//         );

//         if (!rows.length) {
//             return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//         }

//         const user = rows[0];
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//         }

//         const token = jwt.sign(
//             { id: user.client_id, username: user.username, role: 'client' }, // ✅ add role
//             process.env.JWT_SECRET!,
//             { expiresIn: '1h' }
//         );

//         const res = NextResponse.json({ message: 'Login successful' });
//         res.cookies.set('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             path: '/',
//             sameSite: 'strict',
//             maxAge: 3600,
//         });

//         return res;
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ message: 'Server error' }, { status: 500 });
//     } finally {
//         if (conn) await conn.end();
//     }
// }







// // File: /app/api/login/route.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import dbConfig from '@/lib/dbConfig';
// import mysql from 'mysql2/promise';


// export async function POST(req: NextRequest) {
//     const { username, password } = await req.json();
//     let conn;

//     try {
//         const conn = await mysql.createConnection(dbConfig);
//         // use conn to query, then await conn.end() when done


//         const [rows]: any = await conn.execute(
//             'SELECT client_id, username, password FROM clients WHERE username = ?',
//             [username]
//         );

//         if (!rows.length) {
//             return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//         }

//         const user = rows[0];
//         const passwordMatch = await bcrypt.compare(password, user.password);
//         if (!passwordMatch) {
//             return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//         }

//         const token = jwt.sign(
//             { client_id: user.client_id, username: user.username },
//             process.env.JWT_SECRET!,
//             { expiresIn: '1h' }
//         );

//         const res = NextResponse.json({ message: 'Login successful' });
//         res.cookies.set('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             path: '/',
//             sameSite: 'strict',
//             maxAge: 3600,
//         });

//         return res;
//     } catch (err) {
//         console.error(err);
//         return NextResponse.json({ message: 'Server error' }, { status: 500 });
//     } finally {
//         if (conn) conn.release();
//     }
// }
