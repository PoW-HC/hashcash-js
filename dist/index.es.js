import CryptoJS from 'crypto-js';

const DEFAULT_MAX_ITERATIONS = 1 << 20;
class Hashcash {
    constructor(bits, date, resource, rand, counter, ext = '', version = 1) {
        this.bits = bits;
        this.date = date;
        this.resource = resource;
        this.rand = rand;
        this.counter = counter;
        this.ext = ext;
        this.version = version;
        this._randNumber = parseInt(CryptoJS.enc.Base64.parse(counter).toString(CryptoJS.enc.Utf8), 16);
        this.prefix = '0'.repeat(bits);
    }
    Inc() {
        this._randNumber++;
        this.counter = CryptoJS.enc.Utf8.parse(this._randNumber.toString(16)).toString(CryptoJS.enc.Base64);
    }
    Valid(hasher) {
        return this.toString(hasher).startsWith(this.prefix);
    }
    toString(hasher) {
        const hc = `${this.version}:${this.bits}:${this.date}:${this.resource}:${this.ext}:${this.rand}:${this.counter}`;
        if (hasher) {
            return hasher(hc).toString(CryptoJS.enc.Hex);
        }
        return hc;
    }
    toJSON() {
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
class Computer {
    Compute(hc, maxIterations) {
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
    Validate(hc) {
        return hc.Valid(CryptoJS.SHA256);
    }
}

export { Computer, Hashcash };
