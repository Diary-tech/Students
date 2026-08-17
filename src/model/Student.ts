export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  age?: number;
  created_at: Date;
}

export interface CreateStudentDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string; 
  age?: number;
}