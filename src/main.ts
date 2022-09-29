import express, { Request, Response } from 'express';
import dbConnection from './databases/config';
import cors from 'cors';
import auth from './routes/auth.routes';
import events from './routes/events.routes';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001;

//Crea el servidor
const server = express();

//Database
dbConnection();

server.use(cors());
// Dir Publico
server.use(express.static('../public'));

//Lectura y parseo del body
server.use(express.json());

//Rutas
server.use('/', (req: Request, res: Response) => {
  res.send('Hello from Express server');
});
server.use('/api/auth', auth);
server.use('/api/events', events);
//Escuchar Peticiones
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
