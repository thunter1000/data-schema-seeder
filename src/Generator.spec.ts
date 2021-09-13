import { It, Mock, Times, IMock } from "moq.ts"
import { Generator } from "./Generator"

describe("Given record generation", () => {
  let mockedDestination: IMock<IDestination>

  let generator: Generator

  beforeEach(() => {
    mockedDestination = new Mock<IDestination>()
      .setup((i) => i.Process(It.IsAny<any[]>()))
      .returns(null)
    generator = new Generator(mockedDestination.object())
  })

  it("Given 1 record to generate, mocked destination should be called once", () => {
    generator.generate(1)
    mockedDestination.verify(
      (i) => i.Process(It.Is<any[]>((v) => v.length === 1)),
      Times.Once()
    )
  })

  it("Given 2 records to generate, mocked destination should be called twice", () => {
    generator.generate(2)
    mockedDestination.verify(
      (i) => i.Process(It.Is<any[]>((v) => v.length === 1)),
      Times.Exactly(2)
    )
  })
})
