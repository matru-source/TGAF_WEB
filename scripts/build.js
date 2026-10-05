const { execSync } = require('child_process');

// Ensure DATABASE_URL is set so prisma generate never fails on Vercel Preview
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/neondb?sslmode=require';
}

console.log('Generating Prisma Client...');
execSync('npx prisma generate', { stdio: 'inherit', env: process.env });

console.log('Compiling Next.js production build...');
execSync('npx next build', { stdio: 'inherit', env: process.env });
