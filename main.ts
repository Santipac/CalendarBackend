import express from 'express';
import dbConnection from './databases/config';
import cors from 'cors';
import auth from './routes/auth.routes';
import events from './routes/events.routes';
import dotenv from 'dotenv';
dotenv.config();

//Crea el servidor
const server = express();

//Database
dbConnection();

server.use(cors());
// Dir Publico
server.use(express.static('public'));

//Lectura y parseo del body
server.use(express.json());

//Rutas
server.use('/api/auth', auth);
server.use('/api/events', events);
//Escuchar Peticiones
server.listen(process.env.TSC_PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.TSC_PORT}`);
});
