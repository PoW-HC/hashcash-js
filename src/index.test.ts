import { Computer, Hashcash } from './index';
import CryptoJS from 'crypto-js';

describe('hashcash', () => {
  it('Hashcash init', () => {
    const hc = new Hashcash(5, 1650284625, '127.0.0.1', 'AxoCn1Epd44=', 'MA==');
    hc.Inc();

    expect(hc.toString()).toEqual('1:5:1650284625:127.0.0.1::AxoCn1Epd44=:MQ==');
  });

  it('Hashcash 10', () => {
    const hc = new Hashcash(5, 1650284625, '127.0.0.1', 'AxoCn1Epd44=', 'MA==');

    for (let i = 0; i < 10; i++) {
      hc.Inc();
    }

    expect(hc.toString()).toEqual('1:5:1650284625:127.0.0.1::AxoCn1Epd44=:YQ==');
  });

  it('Hashcash sha256', () => {
    const hc = new Hashcash(5, 1650284625, '127.0.0.1', 'AxoCn1Epd44=', 'MA==');

    expect(hc.toString(CryptoJS.SHA256)).toEqual('5eb34a4b0e4a4b5dc93037230f53104522073882a988f4609b922d8ec178e58a');
  });

  it('Hashcash json', () => {
    const hc = new Hashcash(5, 1650284625, '127.0.0.1', 'AxoCn1Epd44=', 'MA==');

    expect(hc.toJSON()).toEqual({ version: 1, bits: 5, date: 1650284625, resource: '127.0.0.1', ext: '', rand: 'AxoCn1Epd44=', counter: 'MA==' });
  });
});

describe('compute', () => {
  it('compute', () => {
    let hc = new Hashcash(5, 1650284625, '127.0.0.1', 'AxoCn1Epd44=', 'MA==');
    const computer = new Computer();

    hc = computer.Compute(hc);

    expect(hc.toString()).toEqual('1:5:1650284625:127.0.0.1::AxoCn1Epd44=:MjcwODk=');
    expect(hc.toString(CryptoJS.SHA256)).toEqual('0000003e62a67440b5c6b78257f4fa48e1e50278fe2e8029ab665afe46c124ba');
  });

  it('validate', () => {
    const hc = new Hashcash(5, 1650284625, '127.0.0.1', 'AxoCn1Epd44=', 'MjcwODk=');
    const computer = new Computer();

    expect(computer.Validate(hc)).toBeTruthy();
  });
});
