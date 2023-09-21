const nodemailer = require('../config/nodemailer');


//this is another way of exporting a method
exports.newComment = (Comment) => {
    let htmlString = nodemailer.renderTemplate({comment: Comment},'/comments/comment.ejs');
    console.log('inside newComment mailer');

    nodemailer.transporter.sendMail({
        from: "formynodemailer@gmail.com",
        to: Comment.user.email,
        subject: "new Comment published!",
        html: '<h1>yup, your comment is now published!</h1>'
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        
    });
}