import { Request, Response } from "express";
import { sendSuccessResponse, sendSuccessResponseWithData } from "../helpers/ApiResponses";

interface Scenario {
    technology: string;
    role: string;
    environment: string;
    scenario: string;
}

const data: Scenario[] = require('../database/data.json');

function search(req: Request, res: Response): Response<any, Record<string, any>> {
    // sanatise inputs
    const tech = (req.body.technology).toLowerCase();
    const role = (req.body.role).toLowerCase();
    const environment = (req.body.environment).toLowerCase();

    // get initial results
    const bestResults: Scenario[] = [];
    const worstResults: Scenario[] = [];

    data.forEach((item: Scenario) => {
        if (item.technology.toLowerCase() == tech && item.role.toLowerCase() == role && item.environment.toLowerCase() == environment) {
            bestResults.push(item);
        } else if (item.technology.toLowerCase() == tech || item.role.toLowerCase() == role || item.environment.toLowerCase() == environment) {
            worstResults.push(item);
        };
    });

    return getRandomScenario(bestResults, worstResults, res, req);
}

function getRandomScenario(bestResults: Scenario[], worstResults: Scenario[], res: Response, req: Request): Response<any, Record<string, any>> {
    if (bestResults.length == 0 && worstResults.length == 0) {
        return sendSuccessResponseWithData(res, 'No scenario found', [req.body.technology, req.body.role, req.body.environment]);
    }

    const source = bestResults.length > 0 ? bestResults : worstResults;
    const scenario = source[Math.floor(Math.random() * source.length)];
    return sendSuccessResponseWithData(res, "Scenario found", scenario);
}

export { search };