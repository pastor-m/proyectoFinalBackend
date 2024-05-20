function adminValidation (req,res,next){
    console.log("1")
    if(req.session.user && req.session.user.role === "admin"){
        console.log(req.session.user.role)
        next()
    } else {
        res.status(403).send('Access denied')
    }
}

export default adminValidation;