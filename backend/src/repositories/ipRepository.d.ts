import type { ReturningType } from '../types/interfaces/./requestReturnType.js';
export declare const updateActiveStatus: (id: number, active: boolean) => Promise<ReturningType | null>;
export declare const getAllIps: () => Promise<ReturningType[]>;
export declare const addNewIP: (value: string, mode: string) => Promise<ReturningType>;
export declare const deleteIP: (value: string) => Promise<ReturningType>;
//# sourceMappingURL=ipRepository.d.ts.map