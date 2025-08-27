import { ipValidator } from '../src/middleware/requestsMiddlewares';
import { Request, Response, NextFunction } from 'express';
import { validIPs, invalidIPs } from '../src/utils/testUtils/ipUtils';

describe('ipValidator middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let next: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = { status: statusMock, json: jsonMock } as unknown as Response;
        next = jest.fn();
    });

    test.each(validIPs)('should call next() for valid IP %s', (ip) => {
        req = { body: { values: [ip] } };
        ipValidator(req as Request, res as Response, next as NextFunction);
        expect(next).toHaveBeenCalled();
        expect(statusMock).not.toHaveBeenCalled();
    });

    test.each(invalidIPs)('should return 400 for invalid IP %s', (ip) => {
        const expectedError = typeof ip === 'string'
            ?{ error: 'Invalid IPv4 address' }
            :{ error: 'All values must be strings' }
        req = { body: { values: [ip] } };
        ipValidator(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(expectedError);
        expect(next).not.toHaveBeenCalled();
    });

});
