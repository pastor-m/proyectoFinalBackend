import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        if(file.fieldname === 'profile'){
            cb(null,'src/public/profiles')
            console.log('uploaded to profiles')
        } else if(file.fieldname === 'product'){
            cb(null,'src/public/products')
            console.log('uploaded to products')
        } else if(file.fieldname === 'document'){
            cb(null,'src/public/documents')
            console.log('uploaded to documents')
        }
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname)
    }
});

const upload = multer({storage:storage});

export default upload