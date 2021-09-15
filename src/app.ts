import { Command } from "commander"
import DestinationFactory from "./destination/DestinationFactory"
import FakerFaker from "./faker/FakerFaker"
import { Generator } from "./Generator"
import ReadFile from "./utils/ReadFile"

const program = new Command()

program
  .requiredOption("-s, --spec <String>", "Specification file")
  .requiredOption("-d, --dest-config <String>", "Destination config")
  .option("-n, --number <Number>", "Number of records to generate", "10")

program.parse(process.argv)

const { spec, destConfig, number } = program.opts()

;(async () => {
  const parsedDestConfig = JSON.parse(await ReadFile(destConfig))
  const parsedSpec = await ReadFile(spec)
  const destination = DestinationFactory(parsedDestConfig)

  try {
    await destination.Connect()

    const faker = new FakerFaker(parsedSpec)

    const generator = new Generator(destination, faker)

    await generator.generate(number)
  } finally {
    await destination.Close()
  }
})().catch(console.error)
