function premiumValidation (req,res,next) {
    
    if(req.session.user.role === "premium"){
        next()
    } else {
        console.log(req.session.user.role)
        res.status(403).send('Access denied')
    }
}

export default premiumValidation