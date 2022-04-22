import CryptoJS from 'crypto-js';

const DEFAULT_MAX_ITERATIONS = 1 << 20;

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

export class Hashcash {
  readonly prefix: string;
  private _randNumber: number;

  constructor(
    public readonly bits: number,
    public readonly date: number,
    public readonly resource: string,
    public readonly rand: string,
    public counter: string,
    public readonly ext: string = '',
    public readonly version: number = 1,
  ) {
    this._randNumber = parseInt(CryptoJS.enc.Base64.parse(counter).toString(CryptoJS.enc.Utf8), 16);
    this.prefix = '0'.repeat(bits);
  }

  Inc(): void {
    this._randNumber++;
    this.counter = CryptoJS.enc.Utf8.parse(this._randNumber.toString(16)).toString(CryptoJS.enc.Base64);
  }

  Valid(hasher: (message: CryptoJS.lib.WordArray | string, cfg?: object) => CryptoJS.lib.WordArray): boolean {
    return this.toString(hasher).startsWith(this.prefix);
  }

  toString(hasher?: (message: CryptoJS.lib.WordArray | string, cfg?: object) => CryptoJS.lib.WordArray): string {
    const hc = `${this.version}:${this.bits}:${this.date}:${this.resource}:${this.ext}:${this.rand}:${this.counter}`;

    if (hasher) {
      return hasher(hc).toString(CryptoJS.enc.Hex);
    }

    return hc;
  }

  toJSON(): IHashcash {
    return {
      version: this.version,
      bits: this.bits,
      date: this.date,
      resource: this.resource,
      ext: this.ext,
      rand: this.rand,
      counter: this.counter,
    };
  }
}

export class Computer {
  Compute(hc: Hashcash, maxIterations?: number): Hashcash {
    if (!maxIterations) {
      maxIterations = DEFAULT_MAX_ITERATIONS;
    }

    let i = 0;
    while (!hc.Valid(CryptoJS.SHA256) && i < maxIterations) {
      hc.Inc();
      i++;
    }

    return hc;
  }

  Validate(hc: Hashcash): boolean {
    return hc.Valid(CryptoJS.SHA256);
  }
}
