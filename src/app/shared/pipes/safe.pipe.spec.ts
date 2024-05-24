import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  const sanitizerSpy = jasmine.createSpyObj('DomSanitizer', [
    'bypassSecurityTrustResourceUrl'
  ]);
  const pipe: SafePipe = new SafePipe(sanitizerSpy);

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should call bypassSecurityTrustResourceUrl with the provided URL', () => {
    const url = 'https://example.com';

    pipe.transform(url);

    expect(sanitizerSpy.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(url);
  });

  it('should return the result of bypassSecurityTrustResourceUrl', () => {
    const url = 'https://example.com';
    const expectedResult = 'safe-url';

    sanitizerSpy.bypassSecurityTrustResourceUrl.and.returnValue(expectedResult);

    const result = pipe.transform(url);

    expect(result).toBe(expectedResult);
  });
});
