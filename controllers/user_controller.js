
const User = require('../models/user');
const fs = require('fs');
const path = require('path');
// module.exports.profile = function(req, res){
//   User.findById(req.params.id, function(err, user){
//     return res.render('user_profile', {
//       title: 'User profile',
//     profile_user: user
//   });
// });
// }


module.exports.profile = async function(req, res) {
  try {
    const user = await User.findById(req.params.id);
    return res.render('user_profile', {
      title: 'User profile',
      profile_user: user,
    });
  } catch (err) {
    
    console.error('Error in finding user:', err);
    
  }
};

module.exports.update = async function(req, res){
//   if(req.user.id == req.params.id){
//     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//       return res.redirect('/');
//     });
//   }else{
//     return res.status(401).send('Unauthorized');
//   }
// }


if(req.user.id == req.params.id){

  try{
  let user = await User.findById(req.params.id);
  User.uploadedAvatar(req, res, function(err){
    if (err){console.log('*****Multer Error:', err)}
    user.name = req.body.name;
    user.email =req.body.email;

    
    if(req.file){
       // to  remove the eariler user profile which is store in the in uploads/users/avatar
      // if(user.avatar){
      //   fs.unlinkSync(path.join(__dirname, '..', user.avatar));
      // }
   
      // this is saving the path of the uploaded file into the avatar
      user.avatar = User.avatarPath + '/' + req.file.filename
    }
    user.save();
    return res.redirect('back');
  })


  }catch(err){
    req.flash('error', err);
     return res.redirect('back');
  }

}else{
  req.flash('error', 'unauthorized');
  return res.status(401).send('Unauthorized');
}


}



//  if(req.cookies.user_id){
//   User.findById(req.cookies.user_id, function(err,user){
//     if(user){
//       return  res.render('user_profile',{
//         title: 'User profile', 
//         user: user
      
//        });
//     }
//     return res.redirect('/users/sign-in');
//   });
//  }else{
//   return res.redirect('/users/sign-in');
//  }
// }


module.exports.signUp = function(req, res){
if(req.isAuthenticated()){
  res.redirect('/users/profile');
}
   return  res.render('user_sign_up',{
    title: "codial | sign Up"
   });
 }
 

 module.exports.signIn =  function(req, res){
  if(req.isAuthenticated()){
    res.redirect('/users/profile');
  }
   return  res.render('user_sign_in',{
    title: "codial | sign in"
   });
 }
 

 //get the sign up data 
//  module.exports.create = function(req, res){
// if (req.body.password != req.body.confirm_password){
//   return res.redirect('back');
// }
// user.findOne({email: req.body.email}, function(err,user){
//   if(err){console.log('error in finding use in signing up'); return}
  
// if(!user){
// user.create(req.body, function(err, user){
//   if(err){console.log('error in creating user while signing up',err); return}

//   return res.redirect('/users/sign-in');
// });
// }else{
//   return res.redirect('back');
// }
// });
//  }



// module.exports.create = async function(req, res) {
//   try {
//     if (req.body.password != req.body.confirm_password) {
//       return res.redirect('back');
//     }

//     const existingUser = await User.findOne({ email: req.body.email });

//     if (!existingUser) {
//       const newUser = await User.create(req.body);
//       return res.redirect('/users/sign-in');
//     } else {
//       return res.redirect('back');
//     }
//   } catch (err) {
//     console.log('Error while signing up:', err);
//     return res.redirect('back');
//   }
// };



module.exports.create = async function(req , res){
  if(req.body.password != req.body.confirm_password){
    console.log("password doesn't match");
      return res.redirect('back');
  }

  try {
      
      let users = await User.findOne({email: req.body.email})
      if(!users){
          let user=await User.create(req.body);
          return res.redirect('/users/sign-in');
      
      }else{
          return res.redirect('back');
      }
      
  } catch (error) {
      console.log(err)
  }

}




//sign in and create a session for the user
 module.exports.createSession = function(req, res){

req.flash('success', 'logged in successfully');


  //steps to authenticate 
  //find the user
  // User.findOne({email: req.body.email}, function(err,user){
  //   if(err){console.log('error in finding user in signing in'); return}
  //   //handle user found 
  //   if(user){

  //     //handle password which doesn't match
  //     if(user.password != req.body.password){
  //       return res.redirect('back');
  //     }
  //     //handle session creation 
  //    // res.cokkie('user_id' , user.id);
  //     return res.redirect('/users/profile');
  //   }else{
  //     //handle user not found 
  //     return res.redirect('back');
  //   }
  // })






//this method is used in passport
return res.redirect('/');

 }

//  module.exports.destroySession = function(req,res){
//   return res.redirect('/')
//  }


 module.exports.destroySession = function(req,res){
  req.logout(function(err){
    if(err){
        console.log('error',err);
        return;
        }
// return res.redirect('/')
req.flash('success', 'logged out successfully');
  return res.redirect('/');
  });
  
 }

 