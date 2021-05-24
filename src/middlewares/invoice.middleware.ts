import { CreateAddressDto } from "@/dtos/addresses.dto";
import { RequestWithUser } from "@/interfaces/auth.interface";
import { plainToClass } from "class-transformer";
import { NextFunction, Response } from "express";

const invoiceMiddleware = (req: RequestWithUser , res: Response, next: NextFunction) =>{
const to = plainToClass(CreateAddressDto, req.body.to)
const from = plainToClass(CreateAddressDto, req.body.from)
req.body = {...req.body, to,from}
next()
}

export default invoiceMiddleware