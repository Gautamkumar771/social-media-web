module.exports.setFlash = function(req, res, next){
    // console.log("req.flash", req.flash);
    res.locals.flash ={
        'success':req.flash('success'),
        'error': req.flash('error')
    }
    next();
}