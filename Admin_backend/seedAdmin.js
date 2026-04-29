import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: 'admin@abhilekha.com' });

    if (!adminExists) {
      await Admin.create({
        email: 'admin@abhilekha.com',
        password: 'Asd@1234', 
      });
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin();
