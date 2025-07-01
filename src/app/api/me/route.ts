import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import dbConfig from '@/lib/dbConfig';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import { parse } from 'cookie';

export async function GET() {
    const headerList = headers();
    const cookieHeader = headerList.get('cookie') || '';
    const cookiesParsed = parse(cookieHeader);
    const token = cookiesParsed.token;

    if (!token) {
        return NextResponse.json({ message: 'No token found' }, { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const conn = await mysql.createConnection(dbConfig);
        let rows: any;

        if (decoded.role === 'admin') {
            [rows] = await conn.execute('SELECT * FROM admins WHERE admin_id = ?', [decoded.id]);
        } else if (decoded.role === 'client') {
            [rows] = await conn.execute('SELECT * FROM clients WHERE client_id = ?', [decoded.id]);
        } else {
            await conn.end();
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        await conn.end();

        return NextResponse.json({ user: { ...rows[0], role: decoded.role } });

    } catch (err) {
        console.error('❌ JWT verification error:', err);
        return NextResponse.json({ message: 'Internal error' }, { status: 500 });
    }
}







// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import dbConfig from '@/lib/dbConfig';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';

// export async function GET() {
//     const cookieStore = cookies(); // ✅ This is now handled correctly
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//         return NextResponse.json({ message: 'No token found' }, { status: 401 });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

//         const conn = await mysql.createConnection(dbConfig);
//         let rows: any;

//         if (decoded.role === 'admin') {
//             [rows] = await conn.execute('SELECT * FROM admins WHERE admin_id = ?', [decoded.id]);
//         } else if (decoded.role === 'client') {
//             [rows] = await conn.execute('SELECT * FROM clients WHERE client_id = ?', [decoded.id]);
//         } else {
//             await conn.end();
//             return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
//         }

//         await conn.end();

//         return NextResponse.json({ user: { ...rows[0], role: decoded.role } });

//     } catch (err) {
//         console.error('JWT/DB error:', err);
//         return NextResponse.json({ message: 'Internal error' }, { status: 500 });
//     }
// }






// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import dbConfig from '@/lib/dbConfig';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';

// export async function GET() {
//     const cookieStore = cookies(); // ✅ no need to await this
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//         return NextResponse.json({ message: 'No token found' }, { status: 401 });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         const conn = await mysql.createConnection(dbConfig);

//         let rows: any = [];
//         if (decoded.role === 'admin') {
//             [rows] = await conn.execute(
//                 'SELECT * FROM admins WHERE admin_id = ?',
//                 [decoded.id]
//             );
//         } else if (decoded.role === 'client') {
//             [rows] = await conn.execute(
//                 'SELECT * FROM clients WHERE client_id = ?',
//                 [decoded.id]
//             );
//         }

//         await conn.end();

//         if (!rows.length) {
//             return NextResponse.json({ message: 'User not found' }, { status: 404 });
//         }

//         return NextResponse.json({ user: { ...rows[0], role: decoded.role } });

//     } catch (err) {
//         console.error('JWT or DB error:', err);
//         return NextResponse.json({ message: 'Internal error' }, { status: 500 });
//     }
// }







// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import dbConfig from '@/lib/dbConfig';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';

// export async function GET() {
//     const cookieStore = await cookies(); // ✅ Await
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//         return NextResponse.json({ message: 'No token found' }, { status: 401 });
//     }

//     let conn;

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         console.log('🔑 Decoded JWT:', decoded); // ✅ Step 2

//         conn = await mysql.createConnection(dbConfig);

//         if (decoded.role === 'admin') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM admins WHERE admin_id = ?',
//                 [decoded.id]
//             );
//             if (!rows.length) {
//                 return NextResponse.json({ message: 'Admin not found' }, { status: 404 });
//             }
//             return NextResponse.json({ user: { ...rows[0], role: 'admin' } });
//         }

//         if (decoded.role === 'client') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM clients WHERE client_id = ?',
//                 [decoded.id]
//             );
//             if (!rows.length) {
//                 return NextResponse.json({ message: 'Client not found' }, { status: 404 });
//             }
//             return NextResponse.json({ user: { ...rows[0], role: 'client' } });
//         }

//         return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

//     } catch (err) {
//         console.error('❌ JWT or DB error:', err);
//         return NextResponse.json({ message: 'Internal error' }, { status: 500 });
//     } finally {
//         if (conn) await conn.end(); // ✅ Always close connection
//     }
// }



// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import dbConfig from '@/lib/dbConfig';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';

// export async function GET() {
//     const cookieStore = await cookies(); // ✅
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//         return NextResponse.json({ message: 'No token found' }, { status: 401 });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         const conn = await mysql.createConnection(dbConfig);

//         if (decoded.role === 'admin') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM admins WHERE admin_id = ?',
//                 [decoded.id]
//             );
//             await conn.end();
//             return NextResponse.json({ user: { ...rows[0], role: 'admin' } }); // ✅ include role
//         }

//         if (decoded.role === 'client') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM clients WHERE client_id = ?',
//                 [decoded.id]
//             );
//             await conn.end();
//             return NextResponse.json({ user: { ...rows[0], role: 'client' } }); // ✅ include role
//         }

//         await conn.end();
//         return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

//     } catch (err) {
//         console.error('❌ JWT or DB error:', err);
//         return NextResponse.json({ message: 'Internal error' }, { status: 500 });
//     }
// }








// // File: /app/api/me/route.ts
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import dbConfig from '@/lib/dbConfig';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';

// export async function GET() {
//     const cookieStore = cookies();
//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//         return NextResponse.json({ message: 'No token found' }, { status: 401 });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         const conn = await mysql.createConnection(dbConfig);

//         if (decoded.role === 'admin') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM admins WHERE admin_id = ?',
//                 [decoded.id]
//             );
//             await conn.end();
//             return NextResponse.json({ user: { ...rows[0], role: 'admin' } });
//         }

//         if (decoded.role === 'client') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM clients WHERE client_id = ?',
//                 [decoded.id]
//             );
//             await conn.end();
//             return NextResponse.json({ user: { ...rows[0], role: 'client' } });
//         }

//         await conn.end();
//         return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

//     } catch (err) {
//         console.error('❌ JWT or DB error:', err);
//         return NextResponse.json({ message: 'Internal error' }, { status: 500 });
//     }
// }







// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers';
// import dbConfig from '@lib/dbConfig';
// import jwt from 'jsonwebtoken';
// import mysql from 'mysql2/promise';

// export async function GET() {
//     const cookieStore = await cookies(); // ✅ Await cookies()

//     const token = cookieStore.get('token')?.value;

//     if (!token) {
//         return NextResponse.json({ message: 'No token found' }, { status: 401 });
//     }

//     try {
//         const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//         console.log('🔍 Decoded JWT:', decoded); // ✅ Debug log

//         const conn = await mysql.createConnection(dbConfig);

//         if (decoded.role === 'admin') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM admins WHERE admin_id = ?',
//                 [decoded.id]
//             );
//             await conn.end();
//             return NextResponse.json({ user: rows[0] });
//         }

//         // ✅ Extend to handle normal users too (optional)
//         if (decoded.role === 'user') {
//             const [rows]: any = await conn.execute(
//                 'SELECT * FROM users WHERE user_id = ?',
//                 [decoded.id]
//             );
//             await conn.end();
//             return NextResponse.json({ user: rows[0] });
//         }

//         await conn.end();
//         return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

//     } catch (err) {
//         console.error('❌ JWT or DB error:', err);
//         return NextResponse.json({ message: 'Internal error' }, { status: 500 });
//     }
// }













