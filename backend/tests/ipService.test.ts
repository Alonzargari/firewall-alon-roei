import * as ipRepository from '../src/repositories/ipRepository';
import * as ipService from '../src/services/ipService';
import { Request, Response } from 'express';

jest.mock('../src/repositories/ipRepository', () => ({
    addNewIP: jest.fn(),
    deleteIP: jest.fn(),
}));

describe('IP Service', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;
    let mockedAddNewIP: jest.MockedFunction<typeof ipRepository.addNewIP>;
    let mockedDeleteIP: jest.MockedFunction<typeof ipRepository.deleteIP>;


    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        res = {
            status: statusMock,
            json: jsonMock
        } as unknown as Response;

        req = { body: { values: [], mode: 'blacklist' } };

        mockedAddNewIP = ipRepository.addNewIP as jest.MockedFunction<typeof ipRepository.addNewIP>;
        mockedDeleteIP = ipRepository.deleteIP as jest.MockedFunction<typeof ipRepository.deleteIP>;
    });


    describe('addIpService', () => {
        test('should add IP successfully', async () => {
            req.body = { values: ['1.1.1.1'], mode: 'blacklist' };
            mockedAddNewIP.mockResolvedValue([{
                id: 'uuid',
                value: '1.1.1.1',
                active: false,
                mode: 'blacklist'
            }]);

            await ipService.addIpService(req as Request, res as Response);

            expect(mockedAddNewIP).toHaveBeenCalledWith('1.1.1.1', 'blacklist');
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                type: 'ip',
                mode: 'blacklist',
                values: ['1.1.1.1'],
                status: 'success'
            });
        });

        test('should return 500 on repository error', async () => {
            req.body = { values: ['1.1.1.1'], mode: 'blacklist' };
            mockedAddNewIP.mockRejectedValue(new Error('DB error'));

            await ipService.addIpService(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'Server error' });
        });
    });

    describe('deleteIpService', () => {
        test('should delete IP successfully', async () => {
            const ip = '2.2.2.2';
            req.body = { values: [ip], mode: 'blacklist' };
            mockedDeleteIP.mockResolvedValue([{ id: 'uuid', value: ip, active: false, mode: 'blacklist' }]);

            await ipService.deleteIpService(req as Request, res as Response);

            expect(mockedDeleteIP).toHaveBeenCalledWith(ip);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                type: 'ip',
                mode: 'blacklist',
                values: [ip],
                status: 'success'
            });
        });

        test('should return 404 if IP not found', async () => {
            const ip = '5.5.5.5';
            req.body = { values: [ip], mode: 'blacklist' };
            mockedDeleteIP.mockResolvedValue([]);
            await ipService.deleteIpService(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'ip not found' });
        });

    });

});
