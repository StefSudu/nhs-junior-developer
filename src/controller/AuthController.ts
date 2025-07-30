import { Request, Response } from "express";
import { sendSuccessResponseWithData, sendUnauthorisedError, sendNotFoundError } from "../helpers/ApiResponses";

const clients = require('../database/credentials.json');
const jwt = require('jsonwebtoken'); 

function generateAccessToken(req: Request, res: Response) {
    const clientId = req.body.client_id;
    const clientSecret = req.body.client_secret;

    if (!clients[clientId]) {
        return sendNotFoundError("Client not found", res);
    } else if (clients[clientId] == clientSecret) {
        // generate jwt token
        const token = jwt.sign({ clientId }, process.env.JWT_SECRET, {
            expiresIn: '5m',
        });
        return sendSuccessResponseWithData(res, 'Client found', token);
    } else {
        return sendUnauthorisedError('Incorrect client password', res);
    }
};

export { generateAccessToken };