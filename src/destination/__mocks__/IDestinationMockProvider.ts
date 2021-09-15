import { Mock, It, IMock } from "moq.ts"
import { IDestination } from "../IDestination"

export default (): IMock<IDestination> =>
  new Mock<IDestination>().setup((i) => i.Process(It.IsAny())).returnsAsync()
