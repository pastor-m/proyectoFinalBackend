import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";

const PRIVATE_KEY = "kEyCOMOsEcreT"

const generateToken = (email) =>{
    const token = jwt.sign(email, PRIVATE_KEY,{expiresIn: '1h'});
    return token;
}

const authToken = (req,res,next) => {
    const authHeader = req.cookies.auth;
    // console.log("authHeader:", authHeader)
    if(!authHeader){
        return res.status(401).send({
            error: "Not authenticated"
        })
    }

    const token = req.cookies.auth;

   

    jwt.verify(token,PRIVATE_KEY,(error,decoded)=>{
        if(error){
            // console.log("este es el token",token)
            return res.status(403).send({error:"Not authorized"})
        }
        req.auth = decoded
        next();
    })
}

export {generateToken, authToken}