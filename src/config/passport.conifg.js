//Passport: middleware para node js con estrategias pre armadas de autenticacion y autorizacion

//Estrategia de que vamos a usar se llama passport-local y toma del ususario un nombre y contrase;a para validarla con la DB.

//npm i passport passport-local

import passport from "passport";

import { Strategy as LocalStrategy } from "passport-local";

import UserModel from "../models/users.model.js";
import CartsModel from "../models/carts.models.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

import GitHubStrategy from "passport-github2";

const initializePassport = () => {
    //Estrategia de registro de usuarios
    passport.use("register", new LocalStrategy({
        //Acceder al objeto request
        passReqToCallback: true,
        usernameField: "email", //El campo de user sera el email.
    }, async(req, username, password, done)=> {
        const {first_name, last_name, email, age} = req.body;
        try {
            const newCart = new CartsModel();
            await newCart.save();
            let user = await UserModel.findOne({email});
            if(user){
                return done(null,false);
            } else if (!user && email == "adminCoder@coder.com"){
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: newCart.id,
                    role: "admin",
                    last_connection: new Date(),
                 }
                 let result = await UserModel.create(newUser);
                 return done (null, result)
            } else {
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: newCart.id,
                    role: "user",
                    last_connection: new Date(),
                 }
                 let result = await UserModel.create(newUser);
                 return done (null, result)
            }

        } catch (error) {
            return done(error);
        }
    }))

    //Estrategia para login de ususarios
    passport.use("login", new LocalStrategy({usernameField: "email"}, async(email, password, done)=>{
        try {
            
            const user = await UserModel.findOne({email});
            // console.log(user);
            if(!user){
                console.log("User doesn't exist")
                return done (null, false);
            }

            if(!isValidPassword(password,user)) {
                return done(null,user)
            }
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }))

    //Serializar usuarios:

    passport.serializeUser((user,done)=> {
        done(null, user._id);
    })

    passport.deserializeUser(async(id, done) => {
        let user = await UserModel.findById({_id:id});
        done(null, user)
    })

    passport.use("github", new GitHubStrategy({
        clientID:"Iv1.808b6e96cd6dca0e",
        clientSecret: "186936dc3433d2de68afbe252598d5ec63f7eb78",
        callbackURL: "http://localhost:8080/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done)=>{
        // console.log("Perfil del ususario:", profile._json.email)
        try {
            let user = await UserModel.findOne({email: profile._json.email});

            if(!user) {
                let newUser = {
                    first_name: profile._json.name,
                    last_name: "Usuario",
                    age: 25,
                    email: profile._json.email,
                    password: "hello",
                    role: "user"
                }
                let result = await UserModel.create(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            return done (error)
        }
    }))

}

export default initializePassport