import { Mock, IMock } from "moq.ts"
import { IFaker } from "../IFaker"

export default (fakerReturnValue: any = null): IMock<IFaker> =>
  new Mock<IFaker>().setup((i) => i.Fake()).returns(fakerReturnValue)
