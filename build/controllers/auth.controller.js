"use strict";
//* Controllers
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revalidateUser = exports.loginUser = exports.createUser = void 0;
/*
1 => Reciben la Request
2 => Extraen la información necesaria que se le provee
3 =>
*/
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../helpers/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya existe. Por favor, ingrese uno nuevo.',
            });
        }
        user = new User_1.default(req.body);
        //Encriptar Password
        const salt = bcrypt_1.default.genSaltSync();
        user.password = bcrypt_1.default.hashSync(password, salt);
        yield user.save();
        //Generar JWT
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal!',
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado',
            });
        }
        //Validar contraseña encriptada
        const validatePassword = bcrypt_1.default.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña Incorrecta',
            });
        }
        const token = yield (0, jwt_1.generateJWT)(user.id, user.name);
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const revalidateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, name } = req;
    const token = yield (0, jwt_1.generateJWT)(uid, name);
    res.json({
        ok: true,
        uid,
        name,
        token,
    });
});
exports.revalidateUser = revalidateUser;
