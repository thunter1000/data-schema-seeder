import { IDestination } from "./destination/IDestination"
import { IFaker } from "./faker/IFaker"

export interface IGenerator {
  generate(count: number): void
}

export class Generator implements IGenerator {
  destination: IDestination

  faker: IFaker

  constructor(destination: IDestination, faker: IFaker) {
    this.destination = destination
    this.faker = faker
  }

  async generate(count: number): Promise<void> {
    for (let i = 0; i < count; i += 1) {
      // We want this behaviour to run in serial.
      // eslint-disable-next-line no-await-in-loop
      await this.destination.Process([this.faker.Fake()])
    }
  }
}
