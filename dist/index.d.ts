import CryptoJS from 'crypto-js';
export interface IHashcash {
    version: number;
    bits: number;
    date: number;
    resource: string;
    ext: string;
    rand: string;
    counter: string;
}
export interface IComputeParams {
    h: IHashcash;
    maxIterations?: number;
    timeoutInSeconds?: number;
}
export interface IValidateParams {
    h: IHashcash;
    resource: string;
}
export declare class Hashcash {
    readonly bits: number;
    readonly date: number;
    readonly resource: string;
    readonly rand: string;
    counter: string;
    readonly ext: string;
    readonly version: number;
    readonly prefix: string;
    private _randNumber;
    constructor(bits: number, date: number, resource: string, rand: string, counter: string, ext?: string, version?: number);
    Inc(): void;
    Valid(hasher: (message: CryptoJS.lib.WordArray | string, cfg?: object) => CryptoJS.lib.WordArray): boolean;
    toString(hasher?: (message: CryptoJS.lib.WordArray | string, cfg?: object) => CryptoJS.lib.WordArray): string;
    toJSON(): IHashcash;
}
export declare class Computer {
    Compute(hc: Hashcash, maxIterations?: number): Hashcash;
    Validate(hc: Hashcash): boolean;
}
//# sourceMappingURL=index.d.ts.map