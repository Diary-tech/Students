import express, { type Express, type Request, type Response } from 'express';
import type { Student } from '../src/model/Student.ts';
import { getAllStudents, createStudent } from './controller/studentController.ts';
const app: Express = express();
app.get('/students' , getAllStudents );
app.post('/students',createStudent);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/create', (req: Request, res: Response) => {
  res.send('Create request received');
});

app.delete('/delete/{id}',(req: Request, res: Response) => {
  const {id} = req.params;
  res.send(`Delete request received for ID : ${id}`)
});

app.listen(3000);