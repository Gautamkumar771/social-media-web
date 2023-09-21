const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

// const queue = require('../config/kue');
// const commentEmailWoker = require('../workers/comment_email_worker');






// module.exports.create = function(req, res){
// post.findById(req.body.post, function(err, post){

//     if(post){
//         comment.create({
//             content: req.body.content,
//             post: req.user._id
//         }, function(err,comment ){
//             post.comments.push(comment);
//             post.save();
//             res.redrirect('/');
//         });
//     }
// });

// }




module.exports.create = async function (req, res) {
    try {
      console.log(req.body);
      const post = await Post.findById(req.body.post);
  
      if (post) {
        let comment = await Comment.create({
          content: req.body.content,
          post: req.body.post,
          user: req.user._id,
        });
     console.log(comment);
        post.comments.push(comment);
         post.save();
         comment = await comment.populate('user', 'name email')
         commentsMailer.newComment(comment);
        //  let job = queueMicrotask.create('emails', comment).save(function(err){
        //   if(err){
        //     console.log('error in creating a queue');
        //   }
        //   console.log(job.id);
        //  })
         
         if(req.xhr){

          return res.status(200).json({
            data:{
              comment:comment
            },

            message: "post created"
          })
         }




        if(req.xhr){
         
          return res.status(200).json({
            data: {
              comment: comment
            },
            Message: "post created"
          });
        }


  
      //   comment = await comment.populate('user', 'name email');
      //   // commentsMailer.newComment(comment);
      //  let job = queue.create('emails', comment).save(function(err){
      //   if(err){
      //     console.log('error in sending to the queue',err);
      //     return;
      //   }
      //   console.log('job enqueued', job.id);
      //  })
  
        req.flash('success', 'Comment Published!');
  //
  
      return res.redirect('back');
        // res.redirect('/');
      }
    } catch (err) {
      // Handle error appropriately
       console.log(err);
    //   req.flash('error', err);
      return res.redirect('back');
      // res.status(500).send('Internal Server Error');
    }
  };


module.exports.deleteComment = async function(req,res){
  let id = req.params.id 
  console.log(id)
  await Comment.findByIdAndDelete(id)
  console.log("comment delted")
  return res.redirect('/');
}



// const Post = require('./models/Post'); // Import the Post model
// const Comment = require('./models/Comment'); // Import the Comment model

// module.exports.create = async function (req, res) {
//     try {
//         // Find the post by its ID
//         let post = await Post.findById(req.body.post);

//         if (post) {
//             // Create a new comment
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             // Add the comment to the beginning of the post's comments array
//             post.comments.unshift(comment);

//             // Save the updated post
//             await post.save();

//             // Populate the user field in the comment
//             comment = await comment.populate('user', 'name email').execPopulate();

//             // Optionally, you can enqueue an email job using a queue system
//             // Here, we're just printing a message to the console

// console.log("Email job enqueued for comment:", comment);

//             // Redirect to the post's page or any other desired location
//             return res.redirect('/posts/' + req.body.post);
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         return res.status(500).send('Error creating comment');
//     }
// }