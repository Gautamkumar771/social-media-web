//model file use for makung DBsChema
// // create schema
// const mongoose=require('mongoose')
// const userSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true,
        
//     },
//     name:{
//         type:String,
//         require:true
//     }
// },{
//    timestamps:true 
// })

// const user=mongoose.model('users',userSchema);
// module.exports=user;

const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema =  mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require: true
    },
    name:{
        type:String,
        require: true
    },
    avatar: {
        type: String,
        // required: true
    }
},{
    timestamps:true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  //static methods to use multer
  userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar')
  userSchema.statics .avatarPath = AVATAR_PATH;



const User = mongoose.model('User',userSchema);
module.exports = User;