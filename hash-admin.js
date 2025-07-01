const bcrypt = require('bcryptjs');

async function createAdmin() {
    const password = 'admin123'; // change this to your desired password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
}

createAdmin();
