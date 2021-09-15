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

  it("Given a schema with an array", () => {
    const givenSchmea = `
{
  "people": [
    { "quantity": 1 },
    {
      "firstName": "{{name.firstName}}",
      "lastName": "{{name.lastName}}"
    }
  ]
}`
    const faker = new FakerFaker(givenSchmea)

    const result = faker.Fake()

    expect(result).toMatchInlineSnapshot(
      {
        people: [
          {
            firstName: expect.any(String),
            lastName: expect.any(String),
          },
        ],
      },
      `
      Object {
        "people": Array [
          Object {
            "firstName": Any<String>,
            "lastName": Any<String>,
          },
        ],
      }
    `
    )
  })

  it("Given a schema with arrays inside arrays", () => {
    const givenSchmea = `
{
  "people": [
    { "quantity": 1 },
    {
      "pets": [
        {
          "quantity": 2
        },
        {
          "name": "{{name.firstName}} {{name.lastName}}"
        }
      ]
    }
  ]
}`

    const faker = new FakerFaker(givenSchmea)

    const result = faker.Fake()

    expect(result).toMatchInlineSnapshot(
      {
        people: [
          {
            pets: [
              {
                name: expect.any(String),
              },

              {
                name: expect.any(String),
              },
            ],
          },
        ],
      },
      `
      Object {
        "people": Array [
          Object {
            "pets": Array [
              Object {
                "name": Any<String>,
              },
              Object {
                "name": Any<String>,
              },
            ],
          },
        ],
      }
    `
    )
  })

  it("Given a schema with an array without objects", () => {
    const givenSchema = `
{
  "array": [
    {
      "quantity": 3
    },
    "{{datatype.number}}"
  ]
}
`

    const faker = new FakerFaker(givenSchema)

    const result = faker.Fake()

    expect(result).toMatchInlineSnapshot(
      {
        array: [expect.any(Number), expect.any(Number), expect.any(Number)],
      },
      `
      Object {
        "array": Array [
          Any<Number>,
          Any<Number>,
          Any<Number>,
        ],
      }
    `
    )
  })
})
