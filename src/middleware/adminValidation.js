function adminValidation (req,res,next){
    // console.log("validacion admin",req.body.role)
    // if((req.session.user && req.session.user.role === "admin")){
        if(true){
        // console.log(req.session.user.role)
        next()
    } else {
        res.status(403).send('Access denied')
    }
}

export default adminValidation;