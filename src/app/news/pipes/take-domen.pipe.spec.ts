import {TakeDomenPipe} from './take-domen.pipe';

describe('TakeDomenPipe', () => {
  let pipe: TakeDomenPipe;

  beforeEach(() => {
    pipe = new TakeDomenPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should extract the domain name right', () => {
    expect(pipe.transform('http://abc.google.com/test?var=1')).toBe('abc.google.com');
  });

  it('should extract the domain name with out www subdomain', () => {
    expect(pipe.transform('http://www.google.com/test?var=1')).toBe('google.com');
  });

  it('should return empty string if url is incorrect', () => {
    expect(pipe.transform('http:/www.google.com/test?var=1')).toBe('');
  });

  it('should return empty string if url is empty', () => {
    expect(pipe.transform('')).toBe('');
  });
});
