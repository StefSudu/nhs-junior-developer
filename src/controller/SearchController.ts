import { Request, Response } from "express";
import ScenarioModel from "../common/models/Scenario";
import { sendSuccessResponse, sendSuccessResponseWithData, sendErrorResponse } from "../helpers/ApiResponses";

const data: ScenarioModel[] = require('../database/data.json');

function search(req: Request, res: Response): Response<any, Record<string, any>> {
    try {
        //sanitise inputs
        const tech = (req.body.technology || "").toLowerCase();
        const role = (req.body.role || "").toLowerCase();
        const environment = (req.body.environment || "").toLowerCase();

        //get initial results
        const bestResults: ScenarioModel[] = [];
        const worstResults: ScenarioModel[] = [];

        data.forEach((item) => {
            const scenario = new ScenarioModel(item.technology, item.role, item.environment, item.scenario)

            if (scenario.matches(tech, role, environment)) {
                bestResults.push(scenario);
            } else {
                worstResults.push(scenario);
            }
        });
        return getRandomScenario(bestResults, worstResults, res, req);
    } catch (error) {
        return sendErrorResponse("Coudn't not make search", res);
    }
}

function getRandomScenario(bestResults: ScenarioModel[], worstResults: ScenarioModel[], res: Response, req: Request): Response<any, Record<string, any>> {
    if (bestResults.length == 0 && worstResults.length == 0) {
        return sendSuccessResponseWithData(res, 'No scenario found', [req.body.technology, req.body.role, req.body.environment]);
    }

    const source = bestResults.length > 0 ? bestResults : worstResults;
    const scenario = source[Math.floor(Math.random() * source.length)];
    return sendSuccessResponseWithData(res, "Scenario found", scenario);
}

export { search };