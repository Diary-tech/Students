import bcrypt from 'bcrypt';
import studentRepository from '../repositories/studentRepository.ts';
import type { Student, CreateStudentDTO } from '../model/Student.ts';

export class StudentService {
  async getAllStudents(): Promise<Student[]> {
    return await studentRepository.findAll();
  }

  async getStudentById(id: string): Promise<Student | null> {
    return await studentRepository.findById(id);
  }

  async createStudent(dto: CreateStudentDTO): Promise<Student> {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(dto.password, saltRounds);

    const newStudent = await studentRepository.create({
      firstName: dto.first_name,
      lastName: dto.last_name,
      email: dto.email,
      passwordHash: password_hash,
      age: dto.age,
    });

    return newStudent;
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<Student | null> {
    return await studentRepository.update(id, data);
  }

  async deleteStudent(id: string): Promise<boolean> {
    return await studentRepository.delete(id);
  }

  async getAverageAge(): Promise<number> {
    const students = await studentRepository.findAll();
    if (students.length === 0) return 0;

    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
  }

}

export default new StudentService();