function userPremiumValidation (req,res,next) {
    
    if(req.session.user && req.session.user.role === "premium" || req.session.user && req.session.user.role === "user"){
        next()
    } else {
        res.status(403).send('Access denied')
    }
}

export default userPremiumValidation