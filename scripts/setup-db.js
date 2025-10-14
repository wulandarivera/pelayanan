/**
 * Script untuk setup database PostgreSQL
 * 
 * Usage:
 * node scripts/setup-db.js
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'pelayanan_kelurahan',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
};

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');

  // Connect to PostgreSQL
  const client = new Client(config);

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Read and execute schema.sql
    console.log('\n📋 Creating tables...');
    const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schemaSql);
    console.log('✅ Tables created successfully');

    // Read and execute seed.sql
    console.log('\n🌱 Seeding data...');
    const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await client.query(seedSql);
    console.log('✅ Data seeded successfully');

    // Verify data
    console.log('\n📊 Verifying data...');
    const kelurahanCount = await client.query('SELECT COUNT(*) FROM kelurahan');
    const usersCount = await client.query('SELECT COUNT(*) FROM users');
    const documentsCount = await client.query('SELECT COUNT(*) FROM documents');

    console.log(`   - Kelurahan: ${kelurahanCount.rows[0].count} records`);
    console.log(`   - Users: ${usersCount.rows[0].count} records`);
    console.log(`   - Documents: ${documentsCount.rows[0].count} records`);

    console.log('\n✨ Database setup completed successfully!\n');
    console.log('📝 Default login credentials:');
    console.log('   Email: admin@cibodas.go.id');
    console.log('   Password: password123\n');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    console.error('\nDetails:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run setup
setupDatabase();
