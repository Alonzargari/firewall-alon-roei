import * as ipRepository from '../src/repositories/ipRepository';
import * as portRepository from '../src/repositories/portRepository';
import * as urlRepository from '../src/repositories/urlRepository';
import * as rulesService from '../src/services/rulesService';

jest.mock('../src/repositories/ipRepository', () => ({ getAllIps: jest.fn() }));
jest.mock('../src/repositories/portRepository', () => ({ getAllPorts: jest.fn() }));
jest.mock('../src/repositories/urlRepository', () => ({ getAllUrls: jest.fn(), updateActiveStatus: jest.fn() }));

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe("rulesService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllRules", () => {
        test("should return all rules grouped by whitelist/blacklist", async () => {
            (ipRepository.getAllIps as jest.Mock).mockResolvedValue([
                { id: 1, value: "1.1.1.1", mode: "blacklist" },
                { id: 2, value: "2.2.2.2", mode: "whitelist" }
            ]);
            (portRepository.getAllPorts as jest.Mock).mockResolvedValue([
                { id: 3, value: "8080", mode: "blacklist" }
            ]);
            (urlRepository.getAllUrls as jest.Mock).mockResolvedValue([
                { id: 4, value: "http://test.com", mode: "whitelist" }
            ]);

            const req: any = {};
            const res = mockResponse();

            await rulesService.getAllRules(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                response: {
                    ips: {
                        blacklist: [{ id: 1, value: "1.1.1.1" }],
                        whitelist: [{ id: 2, value: "2.2.2.2" }]
                    },
                    urls: {
                        blacklist: [],
                        whitelist: [{ id: 4, value: "http://test.com" }]
                    },
                    ports: {
                        blacklist: [{ id: 3, value: "8080" }],
                        whitelist: []
                    }
                }
            });
        });
    });

    describe("toggleActive", () => {
        test("should update url when id exists", async () => {
            (urlRepository.updateActiveStatus as jest.Mock).mockResolvedValue({
                id: 4,
                value: "http://test.com",
                active: true
            });

            const req: any = { body: { urls: { ids: [4], active: true } } };
            const res = mockResponse();

            await rulesService.toggleActive(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                updated: [
                    {
                        urls: [{ id: 4, value: "http://test.com", active: true }],
                        ports: [],
                        ips: []
                    }
                ]
            });
        });

        test("should return error if url id does not exist", async () => {
            (urlRepository.updateActiveStatus as jest.Mock).mockResolvedValue(null);
            const req: any = { body: { urls: { ids: [999], active: true } } };
            const res = mockResponse();
            await rulesService.toggleActive(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: "url id not exist" });
        });
    });
});
