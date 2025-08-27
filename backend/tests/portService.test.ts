import * as portRepository from '../src/repositories/portRepository';
import * as portService from '../src/services/portService';
import { Request, Response } from 'express';

jest.mock('../src/repositories/portRepository', () => ({
    addNewPort: jest.fn(),
    deletePort: jest.fn(),
}));

describe('Port Service', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;
    let mockedAddNewPort: jest.MockedFunction<typeof portRepository.addNewPort>;
    let mockedDeletePort: jest.MockedFunction<typeof portRepository.deletePort>;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });

        res = {
            status: statusMock,
            json: jsonMock
        } as unknown as Response;

        req = { body: { values: [], mode: 'blacklist' } };

        mockedAddNewPort = portRepository.addNewPort as jest.MockedFunction<typeof portRepository.addNewPort>;
        mockedDeletePort = portRepository.deletePort as jest.MockedFunction<typeof portRepository.deletePort>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addPortService', () => {

        test('should add valid port successfully', async () => {
            const port= 2350
            req.body = {values: [port], mode: 'blacklist'};
            mockedAddNewPort.mockResolvedValue([{id: 'uuid', value: port, active: false, mode: 'blacklist'}]);
            await portService.addPortService(req as Request, res as Response);
            expect(mockedAddNewPort).toHaveBeenCalledWith(port, 'blacklist');
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                type: 'port',
                mode: 'blacklist',
                values: [port],
                status: 'success'
            });
        });
    });

    describe('deletePortService', () => {

        test('should delete port successfully', async () => {
            const port = 9;
            req.body = { values: [port], mode: 'blacklist' };
            mockedDeletePort.mockResolvedValue([{ id: 'uuid', value: port, active: false, mode: 'blacklist' }]);

            await portService.deletePortService(req as Request, res as Response);

            expect(mockedDeletePort).toHaveBeenCalledWith(port);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                type: 'port',
                mode: 'blacklist',
                values: [port],
                status: 'success'
            });
        });

        test('should return 404 if port does not exist', async () => {
            const port = 4;
            req.body = { values: [port], mode: 'blacklist' };
            mockedDeletePort.mockResolvedValue([]);
            await portService.deletePortService(req as Request, res as Response);
            expect(mockedDeletePort).toHaveBeenCalledWith(port);
            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ error: 'port not found' });
        });
    });
});
