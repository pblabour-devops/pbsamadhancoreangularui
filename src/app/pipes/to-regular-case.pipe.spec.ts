import { ToRegularCasePipe } from './to-regular-case.pipe';

describe('ToRegularCasePipe', () => {
  it('create an instance', () => {
    const pipe = new ToRegularCasePipe();
    expect(pipe).toBeTruthy();
  });
});
