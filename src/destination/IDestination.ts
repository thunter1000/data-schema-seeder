export interface IDestination {
  Process(records: any[]): Promise<void>
}
