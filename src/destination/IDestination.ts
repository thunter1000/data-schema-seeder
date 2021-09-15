export interface IDestination {
  Connect(): Promise<void>
  Process(records: any[]): Promise<void>
  Close(): Promise<void>
}
