import jwt from 'jsonwebtoken';

export const generateJWT = (uid: string, name: string): Promise<String> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        }

        resolve(token as string);
      }
    );
  });
};
