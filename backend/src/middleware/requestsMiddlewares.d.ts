import type { Request, Response, NextFunction } from 'express';
export declare const validateRequest: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const ipValidator: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const urlValidator: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const portValidator: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requestsMiddlewares.d.ts.map