import winston from "winston";

const customLevelOptions = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "green",
        warning: "blue",
        info: "yellow",
        http: "gray",
        debug: "magenta"
    }

}

const logger = winston.createLogger({

    levels: customLevelOptions.levels,

    //Pasando objeto para crear un logger

    transports:[
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(winston.format.colorize({colors:customLevelOptions.colors}),winston.format.simple()) 
        }),
        new winston.transports.File({filename:'./errors.log',level:'error'})
    ]
})

const loggerProd = winston.createLogger({
    levels: customLevelOptions.levels,

    transports:[
        new winston.transports.Console({
            level: "info", 
            format: winston.format.combine(winston.format.colorize({colors: customLevelOptions.colors}),winston.format.simple())
        }),
        new winston.transports.File({filename:'./errors.log',level:'error'})
    ]

})

//Se crea un middleware

const addLogger = (req,res,next) => {
    if(process.env.MONGO_URL === "mongodb+srv://pastorml09:coderhouse@cluster0.pq1hrhv.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=Cluster0"){
        req.logger = logger;
    } else{
        req.logger = loggerProd;
    }
    

    next();
}

export default addLogger;