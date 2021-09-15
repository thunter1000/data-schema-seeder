import { fake } from "faker"
import { IFaker } from "./IFaker"

export default class FakerFaker implements IFaker {
  schema: string

  constructor(schema: string) {
    this.schema = schema
  }

  private schemaReducer = (schema: any): any =>
    Object.keys(schema).reduce((acc: any, field: string) => {
      let generatedFake

      switch (typeof schema[field]) {
        case "object":
          generatedFake = this.schemaReducer(schema[field])
          break
        case "string":
        default:
          generatedFake = fake(schema[field])
          break
      }

      return {
        ...acc,
        [field]: generatedFake,
      }
    }, {})

  Fake(): any {
    const schema = JSON.parse(this.schema)
    return this.schemaReducer(schema)
  }
}
