import fs from 'fs';
import path from 'path';

const certPath = path.join(process.cwd(), 'certs', 'DigiCertGlobalRootCA.crt.pem');
console.log('🟡 CA Cert Path:', certPath);

let caCert: Buffer | undefined = undefined;
try {
    caCert = fs.readFileSync(certPath);
    console.log('✅ CA cert loaded. Bytes:', caCert.length);
} catch (err) {
    console.error('❌ Failed to load CA certificate:', err);
}

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: caCert,
        rejectUnauthorized: true,
    },
};

console.log('✅ DB Host:', process.env.DB_HOST);
console.log('✅ DB Name:', process.env.DB_NAME);

export default dbConfig;





// import fs from 'fs';
// import path from 'path';

// const certPath = path.join(process.cwd(), 'certs', 'DigiCertGlobalRootCA.crt.pem');
// console.log('🔍 Loading CA from:', certPath); // ✅ Log to verify path
// console.log('🔑 DB_HOST:', process.env.DB_HOST); // ✅ Log DB_HOST
// console.log('🔐 SSL_CA (env var length):', process.env.SSL_CA?.length); // ✅ Show if env var exists

// const dbConfig = {
//     host: process.env.DB_HOST!,
//     user: process.env.DB_USER!,
//     password: process.env.DB_PASSWORD!,
//     database: process.env.DB_NAME!,
//     ssl: {
//         ca: fs.readFileSync(certPath),
//         rejectUnauthorized: true,
//     },
// };

// export default dbConfig;









