import { pool } from '../config/db.ts';

const runMigrations = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        age SMALLINT CHECK (age > 0 AND age <= 150),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
        `);
        console.log('Migrations completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
};

export default runMigrations;