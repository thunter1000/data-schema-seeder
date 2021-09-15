import { Collection, MongoClient } from "mongodb"
import { IDestination } from "./IDestination"

interface MongoDestinationConfig {
  connectionString: string
  dbName: string
  collection: string
}

export default class MongoDestination implements IDestination {
  private config: MongoDestinationConfig

  private client: MongoClient

  private collection: Collection

  constructor(config: MongoDestinationConfig) {
    this.config = config
  }

  async Connect(): Promise<void> {
    this.client = new MongoClient(this.config.connectionString)
    await this.client.connect()
    const database = this.client.db(this.config.dbName)
    this.collection = database.collection(this.config.collection)
  }

  async Close(): Promise<void> {
    await this.client.close()
  }

  async Process(records: any[]): Promise<void> {
    await this.collection.insertMany(records)
  }
}
