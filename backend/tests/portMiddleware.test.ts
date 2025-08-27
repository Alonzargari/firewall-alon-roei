import { portValidator } from '../src/middleware/requestsMiddlewares';
import { Request, Response, NextFunction } from 'express';
import { validPorts, invalidPorts , outOfRangePorts} from '../src/utils/testUtils/portUtils';

describe('portValidator middleware', () => {
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

    test.each(validPorts)('should call next() for valid port %s', (port) => {
        req = { body: { values: [port] } };
        portValidator(req as Request, res as Response, next as NextFunction);
        expect(next).toHaveBeenCalled();
        expect(statusMock).not.toHaveBeenCalled();
    });

    test.each(invalidPorts)('should return 400 for invalid port %s', (port) => {
        const expectedError = typeof port !== "number"
            ? { error: 'All values must be numbers' }
            : { error: 'Port values must be integers' };
        req = { body: { values: [port] } };
        portValidator(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(expectedError);
        expect(next).not.toHaveBeenCalled();
    });

    test.each(outOfRangePorts)('should return 400 for because the port: %s is out of range', (port) => {
        req = { body: { values: [port] } };
        portValidator(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({error: 'Port values must be between 0 and 65535'});
        expect(next).not.toHaveBeenCalled();
    });
});
