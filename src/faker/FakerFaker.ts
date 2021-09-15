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
          generatedFake = fake(value)
          break
      }

      return {
        ...acc,
        [key]: generatedFake,
      }
    }, {})

  Fake(): any {
    const schema = JSON.parse(this.schema)
    return this.schemaReducer(schema)
  }
}
