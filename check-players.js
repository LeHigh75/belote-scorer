require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function checkPlayers() {
  try {
    const players = await prisma.player.findMany();
    console.log('Total players:', players.length);
    console.log('Players:', JSON.stringify(players, null, 2));
    await prisma.$disconnect();
    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  }
}

checkPlayers();
