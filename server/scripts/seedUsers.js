// backend/scripts/seedUsers.js
require('dotenv').config();              // load MONGO_URI
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const User     = require('../models/User');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // List the users you want to create (with plaintext passwords)
  const users = [
    { username: 'admin',    password: 'admin' },
    { username: 'store',password: 'store' },
    { username: 'manager',  password: 'manager' },
  ];

  for (let u of users) {
    // Skip if the user already exists
    const exists = await User.findOne({ username: u.username });
    if (exists) {
      console.log(`User "${u.username}" already exists—skipping.`);
      continue;
    }

    // Hash their password exactly how User model does on save
    const hashed = await bcrypt.hash(u.password, 10);
    await User.collection.insertOne({ username: u.username, password: hashed });
    console.log(`✓ Created user "${u.username}"`);
  }

  await mongoose.disconnect();
  console.log('Seeding complete — disconnected from MongoDB');
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
