import { It, Times, IMock } from "moq.ts"
import { IFaker } from "./faker/IFaker"
import { IDestination } from "./destination/IDestination"
import IDestinationMockProvider from "./destination/__mocks__/IDestinationMockProvider"
import IFakerMockProvider from "./faker/__mocks__/IFakerMockProvider"
import { Generator } from "./Generator"

describe("Given record generation", () => {
  let mockedDestination: IMock<IDestination>

  let generator: Generator

  let mockedFaker: IMock<IFaker>

  const givenFakeData = "fake data"
  const givenFakeData2 = "fake data 2"

  beforeEach(() => {
    mockedDestination = IDestinationMockProvider()

    let fakerCallCount = 0

    mockedFaker = IFakerMockProvider(givenFakeData)
      .setup((i) => i.Fake())
      .callback(() => {
        fakerCallCount += 1
        switch (fakerCallCount) {
          case 1:
            return givenFakeData
          case 2:
            return givenFakeData2
          default:
            return givenFakeData
        }
      })

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
      Times.Once()
    )
    mockedDestination.verify(
      (i) =>
        i.Process(It.Is(([fakeData]: any[]) => fakeData === givenFakeData2)),
      Times.Once()
    )
  })
})
