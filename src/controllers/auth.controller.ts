//* Controllers

/*
1 => Reciben la Request
2 => Extraen la información necesaria que se le provee
3 => 
*/

import bcrypt from 'bcrypt';
import User from '../models/User';
import { generateJWT } from '../helpers/jwt';
import { ApiFunction } from '../types/global';

export const createUser: ApiFunction = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El email ya existe. Por favor, ingrese uno nuevo.',
      });
    }
    user = new User(req.body);

    //Encriptar Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: 'Algo salio mal!',
    });
  }
};
export const loginUser: ApiFunction = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email no encontrado',
      });
    }
    //Validar contraseña encriptada
    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña Incorrecta',
      });
    }
    const token = await generateJWT(user.id, user.name);
    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
export const revalidateUser: ApiFunction = async (req, res) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};
