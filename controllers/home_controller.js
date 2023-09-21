const Post = require('../models/post')
const User = require('../models/user');

  // console.log(req.cookies);
  // res.cookie('user_id',77)
//   Post.find({}, function(err, posts){
//    return res.render('home',{
//       title: "Codeial | home"
//       posts: posts
//      });
//   });


// module.exports.home =  function(req, res){

// //populate the user of each post 


//   Post.find({})
//   .populate('user')
//   .populate({
//     path: 'comments' , 
//     populate: {
//       path: 'user'
//     }
//   })
//   .then(function( posts){
//     User.find({}).then( function( users){

//    return res.render('home',{
//       title: "Codeial | home",
//       posts: posts,
//       all_users: users
//      });
//   })
// }).catch(function(err){
//   console.log("error in home",err)
// })
// }
// module.exports.actionName = function(req, res){}



// using async await fucntion

module.exports.home = async function(req, res){
  //populate the user of each post 
  
  try{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path: 'comments' , 
      populate: {
        path: 'user'
      }
    });

    let users = await User.find({});

    return res.render('home',{
      title: "Codeial | home",
      posts: posts,
      all_users: users
     });
  }catch(err){
console.log(err);
  }
}
