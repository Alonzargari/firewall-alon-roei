import { urlValidator } from '../src/middleware/requestsMiddlewares';
import { Request, Response, NextFunction } from 'express';
import { validURLs, invalidURLs } from '../src/utils/testUtils/urlUtils';

describe('urlValidator middleware', () => {
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

    test.each(validURLs)('should call next() for valid URL %s', (url) => {
        req = { body: { values: [url] } };
        urlValidator(req as Request, res as Response, next as NextFunction);
        expect(next).toHaveBeenCalled();
        expect(statusMock).not.toHaveBeenCalled();
    });

    test.each(invalidURLs)('should return 400 for invalid URL %s', (url) => {
        const expectedError = typeof url === 'string'
            ?{ error: 'URL format is not valid' }
            :{ error: 'All values must be strings' }
        req = { body: { values: [url] } };
        urlValidator(req as Request, res as Response, next as NextFunction);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith(expectedError);
        expect(next).not.toHaveBeenCalled();
    });
});
