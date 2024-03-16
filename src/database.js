import mongoose from "mongoose";

mongoose.connect("mongodb+srv://pastorml09:coderhouse@cluster0.pq1hrhv.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Connected to database"))
    .catch(() =>console.log("Error, can't connect to database"))