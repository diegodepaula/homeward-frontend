import { Counter } from '../Counter';

describe('Counter', () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter();
  });

  it('should start with a count of 0', () => {
    expect(counter.getCount()).toBe(0);
  });

  it('should increment the count by 1', () => {
    counter.increment();
    expect(counter.getCount()).toBe(1);
  });

  it('should increment the count by a given amount', () => {
    counter.incrementBy(5);
    expect(counter.getCount()).toBe(5);
  });

  it('should handle multiple increments correctly', () => {
    counter.increment();
    counter.incrementBy(3);
    expect(counter.getCount()).toBe(4);
  });

  it('should handle negative increments correctly', () => {
    counter.incrementBy(-2);
    expect(counter.getCount()).toBe(-2);
  });

  it('should handle large increments correctly', () => {
    counter.incrementBy(1000000);
    expect(counter.getCount()).toBe(1000000);
  });
});