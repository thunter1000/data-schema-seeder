import { fake } from "faker"
import { IFaker } from "./IFaker"

export default class FakerFaker implements IFaker {
  schema: string

  constructor(schema: string) {
    this.schema = schema
  }

  private schemaReducer = (schema: any): any =>
    Object.keys(schema).reduce((acc: any, key: string) => {
      const value = schema[key]
      let generatedFake
      switch (typeof value) {
        case "object":
          if (Array.isArray(value)) {
            const [{ quantity }, s] = value
            generatedFake = [...Array(quantity)].map(() =>
              this.schemaReducer(s)
            )
          } else {
            generatedFake = this.schemaReducer(value)
          }
          break
        case "string":
        default:
          try {
            generatedFake = fake(value)
          } catch (e) {
            console.error(`Failed to parse specification ${key}:${value} ${e}`)
            throw e
          }
          break
      }

      return {
        ...acc,
        [key]: generatedFake,
      }
    }, {})

  Fake(): any {
    try {
      const schema = JSON.parse(this.schema)
      return this.schemaReducer(schema)
    } catch (e) {
      throw new Error("Failed to parse schema file")
    }
  }
}
