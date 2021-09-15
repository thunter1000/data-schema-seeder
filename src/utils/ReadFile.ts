import { readFile } from "fs"

export default function ReadFile(path: string): Promise<string> {
  return new Promise((res, rej) => {
    readFile(path, "utf8", (err, data) => {
      if (err) {
        rej(err)
        return
      }
      res(data)
    })
  })
}
