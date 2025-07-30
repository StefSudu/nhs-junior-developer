import { Response } from "express";

interface ApiResponse {
    status: number;
    message?: string;
    payload?: any;
};

const sendSuccessResponse = function (msg: string, res: Response) {
    var data: ApiResponse = {
        status: 1,
        message: msg
    }
    return res.status(200).json(data);
};

const sendSuccessResponseWithData = function (res: Response, msg: string, payload: any) {
    var data: ApiResponse = {
        status: 1,
        message: msg,
        payload: payload
    };
    return res.status(200).json(data);
};

const sendErrorResponse = function (msg: string, res: Response) {
    var data: ApiResponse = {
        status: 0,
        message: msg
    };
    return res.status(500).json(data);
}

const sendNotFoundError = function (msg: string, res: Response) {
    var data: ApiResponse = {
        status: 0,
        message: msg,
    };
    return res.status(400).json(data);
};

const sendUnauthorisedError = function (msg: string, res: Response) {
    var data: ApiResponse = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(data);
};

export {sendSuccessResponse, sendSuccessResponseWithData, sendErrorResponse, sendNotFoundError, sendUnauthorisedError};