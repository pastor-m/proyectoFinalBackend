import { Errors } from "../services/errors/enum.js";

const errorController = (error,req,res,next) => {
    console.log(error.cause);
    switch (error.code){
        case Errors.INVLID_TYPE:
            res.send({status: "error", error: error.name});
        break;

        case Errors.DB_ERROR:
            res.send({status: "error", error: error.name});
        break;

        case Errors.ROUTE_ERROR:
            res.send({status:"error", error: error.name});
        break;

        default:
            res.send({status: "error", error: "Unknown error"});

    }
}

export default errorController;