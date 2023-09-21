const Post = require('../models/post');
const Comment = require('../models/comment');




module.exports.create = async function(req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post:post
                },
                message: "post created"
            })
        }
      
        req.flash ('success', 'post published');
        return res.redirect('back');
    } catch (err) {
         console.log('error in creating a Post:', err);
       
         return;
       
    }
};


// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
       
// if(post.user == req.user.id){
//     post.deleteOne();

//     Comment.deleteMany({post: req.params.id}, function(err){
//         return res.redirect('back');
//     });
// }else{
//     return res.redirect('back');
// }
//     });
// }


module.exports.destroy = async function(req, res){
    try{
let post = await Post.findById(req.params.id);
if (post.user == req.user.id){
    post.remove();

    await Comment.deleteMany({post: req.params.id});

    if(req.xhr){
        return res.status(200).json({
            data:{
                post_id: req.params.id
            },
            message: "post deleted"
        })
    }


   req.flash('success', 'post and associated comments delete!')
    return res.redirect('back');
}else{
    req.flash('error', 'ypu cannot delete this post!')
    return res.redirect('back')
}

    }catch(err){
console.log ('Error',err)
return;

    }
}