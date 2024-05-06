const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    console.log(path.extname(file.originalname))
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb){
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, callback){
    if(
      file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'
    ){
      callback(null, true)
    }else{
      callback(null, false)
    }
  },
  limits:{
    fileSize: 1024 * 1024 * 100
  }
})

const xlsxUpload = multer({storage: storage});

module.exports = {upload, xlsxUpload};