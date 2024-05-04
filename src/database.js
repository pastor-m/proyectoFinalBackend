import mongoose from "mongoose";
import configObject from "./config/config.js";
const { mongo_url } = configObject;


await mongoose.connect(mongo_url)
    .then(()=> console.log("Connected to database"))
    .catch(() =>console.log("Error, can't connect to database"))