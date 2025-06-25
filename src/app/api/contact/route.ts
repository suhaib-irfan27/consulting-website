import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Example: log to console (replace with DB/email later)
    console.log('New contact submission:', { name, email, message });

    return NextResponse.json({ success: true });
}
