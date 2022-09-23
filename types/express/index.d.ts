export {};
declare global {
  namespace Express {
    interface Request {
      name: string;
      uid: string;
    }
  }
}
