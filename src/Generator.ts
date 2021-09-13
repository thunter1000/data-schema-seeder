export interface IGenerator {
  generate(count: number): void
}

export class Generator implements IGenerator {
  destination: IDestination

  constructor(destination: IDestination) {
    this.destination = destination
  }

  async generate(count: number): Promise<void> {
    for (let i = 0; i < count; i += 1) {
      this.destination.Process([count])
    }
  }
}
