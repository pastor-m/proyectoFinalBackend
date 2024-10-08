import express from "express";
const app = express();
const PORT = 8080;
import "./database.js"
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import mockingRouter from "./routes/mocking.router.js"
import exphbs from "express-handlebars";
import {Server} from "socket.io";
import passport from "passport";
import initializePassport from "./config/passport.conifg.js";
import MessageModel from "./models/message.model.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import errorController from "./utils/error.js"
import addLogger from "./utils/logger.js";
import mailRouter from "./routes/mail.router.js"
import resetPassRouter from "./routes/reset.router.js"
import usersRouter from "./routes/users.router.js"
import addProductRouter from "./routes/addProd.router.js"
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express"


//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views","./src/views");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));
app.use(addLogger)
app.use(session({
    secret: "jelou",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://pastorml09:coderhouse@cluster0.pq1hrhv.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 1000,
    }),
    proxy: true,
    cookie: {
        secure: false
    }
}))


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use("/products", productsRouter);

app.use("/carts", cartsRouter);

app.use("/", viewsRouter)

app.use("/sessions", sessionsRouter)

app.use("/mockingproducts", mockingRouter)

app.use('/users', usersRouter)

app.use('/addProd', addProductRouter)

app.get("/loggerTest", (req,res)=>{
    req.logger.fatal("Fatal message");
    req.logger.error("Error message");
    req.logger.warning("Warning message");
    req.logger.info("Info message");
    req.logger.http("Http message");
    req.logger.debug("Debug message");

    res.send("Logs sent")
})

app.use(cookieParser());

//Error middleware
app.use(errorController) 

//Mailer
app.use("/mail", mailRouter)

app.use("/resetPass", resetPassRouter)

////CHAT

const httpServer = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


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

const swaggerOptions = {
    definition : {
        openapi: "3.0.1",
        info: {
            title: "Documentacion sobre E-commerce",
            description: "Tech products ecommerce app"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
