import multer from 'multer';
import path from 'path';
import fs from 'fs';



//Create uploads directory if it doesn't exist
export const uploadDir = "uploads";

if(!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir , { recursive: true });
}



//Set Storage Engine
export const storage = multer.diskStorage({
  destination: function(req , file , cb){
    cb(null , uploadDir);
  },

  filename: function(req , file , cb){
    cb(null , `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
})



//Check File Type
export const checkFileType = function(file , cb){
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null , true);
  }
  else{
    cb('Error: Images Only!');
  }
}


//initialize Upload
export const upload = multer({
  storage: storage,
  limits : { fileSize: 2 * 1024 * 1024 }, //2MB
  fileFilter: function(req , file , cb){
    checkFileType(file , cb);
  }
}).single('coverImage');
