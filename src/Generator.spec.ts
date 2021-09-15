import { It, Mock, Times, IMock } from "moq.ts"
import IDestinationMockProvider from "./destination/__mocks__/IDestinationMockProvider"
import IFakerMockProvider from "./faker/__mocks__/IFakerMockProvider"
import { Generator } from "./Generator"

describe("Given record generation", () => {
  let mockedDestination: IMock<IDestination>

  let generator: Generator

  const givenFakeData = "fake data"

  beforeEach(() => {
    mockedDestination = IDestinationMockProvider()
    const mockedFaker = IFakerMockProvider(givenFakeData)

    generator = new Generator(mockedDestination.object(), mockedFaker.object())
  })

  it("Given 1 record to generate, mocked destination should be called once", async () => {
    await generator.generate(1)
    mockedDestination.verify(
      (i) =>
        i.Process(It.Is(([fakeData]: any[]) => fakeData === givenFakeData)),
      Times.Once()
    )
  })

  it("Given 2 records to generate, mocked destination should be called twice", async () => {
    await generator.generate(2)
    mockedDestination.verify(
      (i) =>
        i.Process(It.Is(([fakeData]: any[]) => fakeData === givenFakeData)),
      Times.Exactly(2)
    )
  })
})
