import { add } from '../../src/index';

describe('testFile tests', () => {
  it('should add two numbers correctly', () => {
    assert.are_equal(add(1, 2), 3);
  });
});
