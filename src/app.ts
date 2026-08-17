import express, { type Express, type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { getAllStudents, createStudent ,deleteStudent,updateStudent} from './controller/studentController.ts';
import { errorHandler } from './security/errorHandler.middleware.ts';
import { authenticateToken } from './security/auth.middleware.ts';
const app: Express = express();
app.use(helmet());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' })); // à restreindre en prod
app.use(express.json({ limit: '10kb' })); 
app.get('/students' ,authenticateToken, getAllStudents );
app.post('/students',authenticateToken, createStudent);
app.delete('/students/:id', authenticateToken, deleteStudent);
app.put('/students/:id', authenticateToken, updateStudent);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(errorHandler);
app.listen(3000);