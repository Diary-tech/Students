import { pool } from '../config/db.ts';

const runMigrations = async () => {
    try {
        await pool.query(`
            
        `);
        console.log('Migrations completed successfully');
    } catch (error) {
        console.error('Migration failed:', error);
        throw error;
    }
};

export default runMigrations;