module.exports = {
    verifyUserAuth : (req,res,next) => {
        if(req.session.isAuth) {

            console.log("waiting...........");
            
            next()
        } else {
            console.log(req.session);
            
            console.log("some kindi things..........");
            
            res.redirect('/voter/login')
        }
    }  
}