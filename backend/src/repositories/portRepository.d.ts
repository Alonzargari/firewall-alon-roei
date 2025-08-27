import type { ReturningType } from '../types/interfaces/./requestReturnType.js';
export declare function updateActiveStatus(id: number, active: boolean): Promise<ReturningType | null>;
export declare const getAllPorts: () => Promise<ReturningType[]>;
export declare const addNewPort: (value: number, mode: string) => Promise<ReturningType>;
export declare const deletePort: (value: number) => Promise<ReturningType>;
//# sourceMappingURL=portRepository.d.ts.map