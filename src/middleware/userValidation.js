function userValidation (req,res,next){
    if(req.session.user && req.session.user.role === "user"){
        // console.log(req.session.user.role)
        next()
    } else {
        res.status(403).send('Access denied')
    }
}

export default userValidation;