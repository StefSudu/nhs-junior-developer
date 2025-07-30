import { generateAccessToken } from '../../controller/AuthController';
import { Request, Response } from 'express';

jest.mock('../../database/credentials.json', () => ({
  valid_client: 'valid_secret',
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked.jwt.token'),
}));

jest.mock('../../helpers/ApiResponses', () => ({
  sendSuccessResponseWithData: jest.fn(),
  sendUnauthorisedError: jest.fn(),
  sendNotFoundError: jest.fn(),
}));

import { sendSuccessResponseWithData, sendUnauthorisedError, sendNotFoundError } from '../../helpers/ApiResponses';
import jwt from 'jsonwebtoken';

describe('generateAccessToken', () => {
  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, JWT_SECRET: 'testsecret' };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should return 404 if client ID does not exist', () => {
    const req = {
      body: {
        client_id: 'invalid_client',
        client_secret: 'any',
      },
    } as Request;

    const res = mockRes();

    generateAccessToken(req, res);

    expect(sendNotFoundError).toHaveBeenCalledWith('Client not found', res);
  });

  it('should return 401 if client secret is incorrect', () => {
    const req = {
      body: {
        client_id: 'valid_client',
        client_secret: 'wrong_secret',
      },
    } as Request;

    const res = mockRes();

    generateAccessToken(req, res);

    expect(sendUnauthorisedError).toHaveBeenCalledWith('Incorrect client password', res);
  });

  it('should return JWT token if credentials are correct', () => {
    const req = {
      body: {
        client_id: 'valid_client',
        client_secret: 'valid_secret',
      },
    } as Request;

    const res = mockRes();

    generateAccessToken(req, res);

    expect(jwt.sign).toHaveBeenCalledWith(
      { clientId: 'valid_client' },
      'testsecret',
      { expiresIn: '5m' }
    );

    expect(sendSuccessResponseWithData).toHaveBeenCalledWith(res, 'Client found', 'mocked.jwt.token');
  });
});
