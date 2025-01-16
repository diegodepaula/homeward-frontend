export class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
  }

  incrementBy(amount: number): void {
    this.count += amount;
  }

  getCount(): number {
    return this.count;
  }
}