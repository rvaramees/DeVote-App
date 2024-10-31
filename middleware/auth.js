module.exports = {
    verifyAdminAuth : (req, res, next) => {
        if(req.session.adminAuth) {
            console.log("Session started");
            console.log(req.session);
            next();
        }
        else{
            console.log(req.session);
            res.redirect('/admin/login');
        }
    },
    verifyUserAuth : (req,res,next) => {
        if(req.session.userAuth) {
            console.log("Session started");
            console.log(req.session);
            next()
        } else {
            console.log(req.session);
            console.log("Session ended or invalid entry");
            res.redirect('/voter/login')
        }
    }  
}