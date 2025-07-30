import { search } from '../../controller/SearchController';
import { Request, Response } from 'express';
import * as apiResponses from '../../helpers/ApiResponses';

// Mock data.json
jest.mock('../database/data.json', () => ([
  {
    technology: 'Node',
    role: 'Backend',
    environment: 'Cloud',
    scenario: 'Build scalable API'
  },
  {
    technology: 'React',
    role: 'Frontend',
    environment: 'Browser',
    scenario: 'Build interactive UI'
  }
]), { virtual: true });

// Mock ApiResponses
jest.mock('../../helpers/ApiResponses', () => ({
  sendSuccessResponse: jest.fn(),
  sendSuccessResponseWithData: jest.fn(),
}));

describe('search controller', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return "No scenario found" if no matches', () => {
    const req = {
      body: {
        technology: 'Python',
        role: 'ML',
        environment: 'Edge',
      }
    } as Request;
    const res = mockRes();

    search(req, res);

    expect(apiResponses.sendSuccessResponseWithData).toHaveBeenCalledWith(
      res,
      'No scenario found',
      ['Python', 'ML', 'Edge']
    );
  });

  it('should return a scenario on exact match', () => {
    const req = {
      body: {
        technology: 'Cybersecurity',
        role: 'Security Analyst',
        environment: 'Enterprise Network',
      }
    } as Request;
    const res = mockRes();

    search(req, res);

    expect(apiResponses.sendSuccessResponseWithData).toHaveBeenCalledWith(
      res,
      'Scenario found',
      expect.objectContaining({
        technology: 'Cybersecurity',
        role: 'Security Analyst',
        environment: 'Enterprise Network',
      })
    );
  });

  it('should return a scenario on partial match when no exact match exists', () => {
    const req = {
      body: {
        technology: 'DevOps',
        role: 'Frontend',
        environment: 'Browser',
      }
    } as Request;
    const res = mockRes();

    search(req, res);

    expect(apiResponses.sendSuccessResponseWithData).toHaveBeenCalledWith(
      res,
      'Scenario found',
      expect.any(Object)
    );
  });
});
