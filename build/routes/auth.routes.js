"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const fieldValidate_1 = __importDefault(require("../middlewares/fieldValidate"));
const validateJWT_1 = require("../middlewares/validateJWT");
// Rutas User/Auth === host + /api/auth
const router = (0, express_1.Router)();
router.post('/new', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener 8 caracteres como minimo').isLength({ min: 8 }),
    fieldValidate_1.default,
], auth_controller_1.createUser);
router.post('/', [
    (0, express_validator_1.check)('email', 'El correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contraseña debe tener 8 caracteres como minimo').isLength({ min: 8 }),
    fieldValidate_1.default,
], auth_controller_1.loginUser);
router.get('/revalidate', validateJWT_1.validateJWT, auth_controller_1.revalidateUser);
exports.default = router;
