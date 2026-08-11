import studentRepository from '../repository/studentRepository.ts';
import type { Student } from '../model/Student.ts';

export class StudentService {
  async getAllStudents(): Promise<Student[]> {
    return await studentRepository.findAll();
  }

  async getStudentById(id: string): Promise<Student | null> {
    return await studentRepository.findById(id);
  }

  async createStudent(data: Partial<Student>): Promise<Student> {
    return await studentRepository.create(data as {
      firstName: string;
      lastName: string;
      email: string;
      age?: number;
    });
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<Student | null> {
    return await studentRepository.update(id, data);
  }

  async deleteStudent(id: string): Promise<boolean> {
    return await studentRepository.delete(id);
  }
}

export default new StudentService();