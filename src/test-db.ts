import pool from './lib/db';

(async () => {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('✅ Connected!', rows);
    } catch (err) {
        console.error('❌ Connection failed:', err);
    }
})();
