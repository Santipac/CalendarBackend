"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./databases/config"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const events_routes_1 = __importDefault(require("./routes/events.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3001;
//Crea el servidor
const server = (0, express_1.default)();
//Database
(0, config_1.default)();
server.use((0, cors_1.default)());
// Dir Publico
server.use(express_1.default.static('../public'));
//Lectura y parseo del body
server.use(express_1.default.json());
//Rutas
server.use('/', (req, res) => {
    res.send('Hello from Express server');
});
server.use('/api/auth', auth_routes_1.default);
server.use('/api/events', events_routes_1.default);
//Escuchar Peticiones
server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
