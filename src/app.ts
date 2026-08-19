import express, { type Express, type Request, type Response } from 'express';
import studentController, { getAllStudents, createStudent, deleteStudent, updateStudent } from './controller/studentController.ts';
import { errorHandler } from './security/errorHandler.middleware.ts';
import { authenticateToken } from './security/auth.middleware.ts';
import { login } from './controller/authController.ts';

const app: Express = express();

app.use(express.json());

app.post('/login', login);

app.get('/students', authenticateToken, getAllStudents);

app.post('/students', authenticateToken, createStudent);

app.delete('/students/:id', authenticateToken, deleteStudent);

app.put('/students/:id', authenticateToken, updateStudent);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/students/average_age',authenticateToken ,studentController.getAverageAge);

app.use(errorHandler);

app.listen(3000);