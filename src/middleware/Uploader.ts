import multer from 'multer';
import path from 'path';
// Import the types from multer directly to avoid Express type conflicts
import type { FileFilterCallback } from 'multer';

// Configure multer storage
const storage = multer.diskStorage({});

// Create and export the multer instance
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    try {
      const ext = path.extname(file.originalname).toLowerCase();
      console.log(ext);
      const supported = ['.png', '.jpg', '.jpeg', '.webp', '.pdf'];
      
      if (!supported.includes(ext)) {
        console.log('Unsupported file: ', ext);
        return callback(new Error(`File type ${ext} is not supported. Supported types are ${supported.join(', ')}.`));
      }
      callback(null, true);
    } catch (error) {
      console.log('Error in multer middleware: ', error);
      callback(null, false);
    }
  }
});

export default upload;