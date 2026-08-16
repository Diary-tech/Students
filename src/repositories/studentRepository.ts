import { pool } from '../config/db.ts';
import type { Student } from '../model/Student.ts';

export class StudentRepository {
  async findAll(): Promise<Student[]> {
    const query = 'SELECT * FROM students ORDER BY created_at DESC';
    const result = await pool.query<Student>(query);
    return result.rows;
  }

  async findById(id: string): Promise<Student | null> {
    const query = 'SELECT * FROM students WHERE id = $1';
    const result = await pool.query<Student>(query, [id]);
    return result.rows[0] || null;
  }

  async create(studentData: { firstName: string; lastName: string; email: string; age?: number }): Promise<Student> {
    const query = `
      INSERT INTO students (first_name, last_name, email, age)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [studentData.firstName, studentData.lastName, studentData.email, studentData.age ?? null];
    const result = await pool.query<Student>(query, values);
    return result.rows[0];
  }

  async update(id: string, studentData: Partial<Student>): Promise<Student | null> {
    const fields = [];
    const values = [];

    if (studentData.first_name !== undefined) {
      fields.push('first_name = $' + (fields.length + 2));
      values.push(studentData.first_name);
    }

    if (studentData.last_name !== undefined) {
      fields.push('last_name = $' + (fields.length + 2));
      values.push(studentData.last_name);
    }

    if (studentData.email !== undefined) {
      fields.push('email = $' + (fields.length + 2));
      values.push(studentData.email);
    }

    if (studentData.age !== undefined) {
      fields.push('age = $' + (fields.length + 2));
      values.push(studentData.age);
    }

    if (fields.length === 0) {
      return await this.findById(id);
    }

    const query = `
      UPDATE students
      SET ${fields.join(', ')}
      WHERE id = $1
      RETURNING *
    `;

    const result = await pool.query<Student>(query, [id, ...values]);
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM students WHERE id = $1';
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

export default new StudentRepository();