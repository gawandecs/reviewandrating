import { Request, Response } from "express";
function errorHandler(error:any,req:Request,res:Response,next:any){

    error.message=error.message||"internal server error";
    error.statusCode=error.statusCode||500
    
        res.status(error.statusCode).json({
            success:"failure",
            message:error.message,
        
    })

}

export default errorHandler