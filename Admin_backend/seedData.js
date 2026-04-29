import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Client from './models/Client.js';
import Job from './models/Job.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for data seeding...');

    // Clean existing data (optional)
    await Client.deleteMany({});
    await Job.deleteMany({});

    // Create Clients
    const client1 = await Client.create({
      name: 'TechSolutions Inc',
      image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png'
    });

    const client2 = await Client.create({
      name: 'Greenery Global',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    });


    console.log('✅ Sample Clients created!');

    // Create Jobs
    await Job.create([
      {
        title: 'Senior Frontend Developer',
        client: client1._id,
        category: 'IT / Software',
        experience: '5-8 Years',
        education: 'B.Tech / MCA',
        jobLocation: 'Bangalore, India',
        type: 'Full-time',
        salary: '12 LPA - 18 LPA',
        status: 'Open',
        description: 'Looking for a React expert with experience in Tailwind CSS.'
      },
      {
        title: 'Backend Architect',
        client: client1._id,
        category: 'IT / Software',
        experience: '8-12 Years',
        education: 'M.Tech / MS',
        jobLocation: 'Remote',
        type: 'Full-time',
        salary: '25 LPA - 35 LPA',
        status: 'Open',
        description: 'Node.js and MongoDB expert needed for scale.'
      },
      {
        title: 'Marketing Manager',
        client: client2._id,
        category: 'Marketing',
        experience: '3-5 Years',
        education: 'MBA',
        jobLocation: 'Mumbai, India',
        type: 'Full-time',
        salary: '10 LPA - 15 LPA',
        status: 'Open',
        description: 'Lead premium marketing campaigns for sustainability projects.'
      }
    ]);


    console.log('✅ Sample Jobs created!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
