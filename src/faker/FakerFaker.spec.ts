import FakerFaker from "./FakerFaker"

describe("Given a schema a fake is returned", () => {
  it("Given a 1 dimentional schema a fake is generated", () => {
    const givenSchema = `
{
  "firstName": "{{name.firstName}}",
  "lastName": "{{name.lastName}}"
}
    `
    const faker = new FakerFaker(givenSchema)

    const result = faker.Fake()

    expect(result.firstName).toEqual(expect.stringMatching(/.+/))
    expect(result.lastName).toEqual(expect.stringMatching(/.+/))
  })

  it("Given a 2 dimentional schema a fake is generated", () => {
    const givenSchema = `
{
  "name": {
    "firstName": "{{name.firstName}}",
    "lastName": "{{name.lastName}}"
  }
}
    `
    const faker = new FakerFaker(givenSchema)

    const result = faker.Fake()

    expect(result.name.firstName).toEqual(expect.stringMatching(/.+/))
    expect(result.name.lastName).toEqual(expect.stringMatching(/.+/))
  })
  it("Given a 3 dimentional schema a fake is generated", () => {
    const givenSchema = `
{
  "person": {
    "name": {
      "firstName": "{{name.firstName}}",
      "lastName": "{{name.lastName}}"
    }
  }
}
    `
    const faker = new FakerFaker(givenSchema)

    const result = faker.Fake()

    expect(result.person.name.firstName).toEqual(expect.stringMatching(/.+/))
    expect(result.person.name.lastName).toEqual(expect.stringMatching(/.+/))
  })

  // it("Given a schema with an array", () => { // TODO allow generation of arrays
  //   throw new Error("TODO implement")
  // })
})
