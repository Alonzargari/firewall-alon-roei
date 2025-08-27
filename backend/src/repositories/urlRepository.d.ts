import type { ReturningType } from '../types/interfaces/./requestReturnType.js';
export declare function updateActiveStatus(id: number, active: boolean): Promise<ReturningType | null>;
export declare const getAllUrls: () => Promise<ReturningType[]>;
export declare const addNewUrl: (value: string, mode: string) => Promise<ReturningType>;
export declare const deleteUrl: (value: string) => Promise<ReturningType>;
//# sourceMappingURL=urlRepository.d.ts.map