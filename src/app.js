import express from "express";
const app = express();
const PORT = 8080;
import "./database.js"
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"
import viewsRouter from "./routes/views.router.js"
import exphbs from "express-handlebars";
import {Server} from "socket.io";


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

//Rutas
app.use("/products", productsRouter);

app.use("/carts", cartsRouter);

app.use("/chat", viewsRouter)
////CHAT

const httpServer = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})
//1) Me guardo una referencia del servidor. 

import MessageModel from "./models/message.model.js";
const io = new Server(httpServer);


io.on("connection", (socket) => {
    console.log("Un cliente conectado");

    socket.on("message", async (data) => {
        //Recibo la data del cliente y lo voy a guardar
        await MessageModel.create(data);

        const messages = await MessageModel.find();
        io.sockets.emit("message", messages)

 
    })
} )