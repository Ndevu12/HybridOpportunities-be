import { IUser } from './src/models/User'; // Adjust the path as necessary
import { RequestHandler } from 'express';
import * as multer from 'multer';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
    userId?: string;
  }
}

declare global {
  namespace Express {
    // Properly augment the Express namespace for Multer
    interface Request {
      file?: Multer.File;
      files?: {
        [fieldname: string]: Multer.File[];
      } | Multer.File[];
    }
  }
}

// Create a module augmentation to make multer middleware compatible with express RequestHandler
declare module 'multer' {
  interface Multer {
    single(fieldname: string): RequestHandler;
    array(fieldname: string, maxCount?: number): RequestHandler;
    fields(fields: ReadonlyArray<{name: string; maxCount?: number}>): RequestHandler;
    none(): RequestHandler;
    any(): RequestHandler;
  }
}