import { Router } from 'express';
import { check } from 'express-validator';
import {
  createUser,
  loginUser,
  revalidateUser,
} from '../controllers/auth.controller';
import fieldValidate from '../middlewares/fieldValidate';
import { validateJWT } from '../middlewares/validateJWT';

// Rutas User/Auth === host + /api/auth

const router = Router();

router.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),

    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password',
      'La contraseña debe tener 8 caracteres como minimo'
    ).isLength({ min: 8 }),
    fieldValidate,
  ],
  createUser
);
router.post(
  '/',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check(
      'password',
      'La contraseña debe tener 8 caracteres como minimo'
    ).isLength({ min: 8 }),
    fieldValidate,
  ],
  loginUser
);
router.get('/revalidate', validateJWT, revalidateUser);

export default router;
