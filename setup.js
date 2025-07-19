#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏨 Villa Shanti Hotel Booking System Setup\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
} else {
  console.log('📝 Creating .env.local file...');
  const envContent = `# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/villa-shanti

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created');
  console.log('⚠️  Please update the environment variables in .env.local');
}

// Check if node_modules exists
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ Dependencies already installed');
} else {
  console.log('📦 Installing dependencies...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
  } catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
  }
}

console.log('\n🎉 Setup completed!');
console.log('\n📋 Next steps:');
console.log('1. Update .env.local with your actual values');
console.log('2. Start MongoDB (local or cloud)');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');
console.log('5. Seed the database: http://localhost:3000/api/seed');
console.log('\n📚 For more information, see README.md'); 