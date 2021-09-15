import { IDestination } from "./IDestination"
import MongoDestination from "./MongoDestination"

export default function ({
  destinationType,
  ...destinationConfig
}: any): IDestination {
  switch (destinationType) {
    case "mongo":
      return new MongoDestination(destinationConfig)
    default:
      throw new Error(`Destination type ${destinationType} unknown`)
  }
}
