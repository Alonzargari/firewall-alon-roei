import * as urlRepository from '../src/repositories/urlRepository';
import * as urlService from '../src/services/urlService';
import { Request, Response } from 'express';

jest.mock('../src/repositories/urlRepository', () => ({
    addNewUrl: jest.fn(),
    deleteUrl: jest.fn(),
}));

describe('URL Service', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;
    let mockedAddNewURL: jest.MockedFunction<typeof urlRepository.addNewUrl>;
    let mockedDeleteURL: jest.MockedFunction<typeof urlRepository.deleteUrl>;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = {
            status: statusMock,
            json: jsonMock
        } as unknown as Response;
        req = { body: { values: [], mode: 'blacklist' } };
        mockedAddNewURL = urlRepository.addNewUrl as jest.MockedFunction<typeof urlRepository.addNewUrl>;
        mockedDeleteURL = urlRepository.deleteUrl as jest.MockedFunction<typeof urlRepository.deleteUrl>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addURLService', () => {
        test('should add URL successfully', async () => {
            const url = 'https://example.com';
            req.body = { values: [url], mode: 'blacklist' };
            mockedAddNewURL.mockResolvedValue([{ id: 'uuid', value: url, active: false, mode: 'blacklist' }]);
            await urlService.addUrlService(req as Request, res as Response);
            expect(mockedAddNewURL).toHaveBeenCalledWith(url, 'blacklist');
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                type: 'url',
                mode: 'blacklist',
                values: [url],
                status: 'success'
            });
        });

        test('should return 500 on repository error', async () => {
            const url = 'https://example.com';
            req.body = { values: [url], mode: 'blacklist' };
            mockedAddNewURL.mockRejectedValue(new Error('DB error'));
            await urlService.addUrlService(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Server error' });
        });
    });

    describe('deleteURLService', () => {

        test('should return 404 if URL not found', async () => {
            const url = 'https://nonexistent.com';
            req.body = { values: [url], mode: 'blacklist' };
            mockedDeleteURL.mockResolvedValue([]);
            await urlService.deleteUrlService(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'url not found' });
        });

        test('should delete URL successfully', async () => {
            const url = 'https://example.com';
            req.body = { values: [url], mode: 'blacklist' };
            mockedDeleteURL.mockResolvedValue([{ id: 'uuid', value: url, active: false, mode: 'blacklist' }]);
            await urlService.deleteUrlService(req as Request, res as Response);
            expect(mockedDeleteURL).toHaveBeenCalledWith(url);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                type: 'url',
                mode: 'blacklist',
                values: [url],
                status: 'success'

            });
        });
    });
});
