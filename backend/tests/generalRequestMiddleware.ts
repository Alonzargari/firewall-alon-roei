import { Request, Response, NextFunction } from 'express';
import { validateRequest } from '../src/middleware/requestsMiddlewares';
import { validRequests, invalidModeRequests, invalidValuesRequests, missingModeRequests } from '../src/utils/testUtils/requestUtils';

describe('validateRequest middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    let next: jest.Mock;

    beforeEach(() => {
        req={}
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = { status: statusMock, json: jsonMock } as unknown as Response;
        next = jest.fn();
    });

    test.each(validRequests)('should call next() for valid request %#', (body) => {
        req.body = body;
        validateRequest(req as Request, res as Response, next as NextFunction);
        expect(next).toHaveBeenCalled();
        expect(statusMock).not.toHaveBeenCalled();
        expect(jsonMock).not.toHaveBeenCalled();
    });

    test.each(invalidModeRequests)('should return 400 for invalid mode %#', (body) => {
        req.body = body;
        validateRequest(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test.each(invalidValuesRequests)('should return 400 for invalid values %#', (body) => {
        req.body = body;
        validateRequest(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    test.each(missingModeRequests)('should return 400 if mode is missing %#', (body) => {
        req.body = body;
        validateRequest(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});
