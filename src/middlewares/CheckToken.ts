import { Request, Response, NextFunction } from "express";
import { sendUnauthorisedError, sendNotFoundError } from "../helpers/ApiResponses";

const jwt = require('jsonwebtoken');

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) {
        return sendNotFoundError('Token not found', res);
    };
  
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any) => {
        if (err) {
            return sendUnauthorisedError("Unauthorised", res);
        };
        next();
    });
};

export default authenticateToken;