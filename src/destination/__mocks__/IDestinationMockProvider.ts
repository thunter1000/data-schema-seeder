import { Mock, It, IMock } from "moq.ts"

export default (): IMock<IDestination> =>
  new Mock<IDestination>().setup((i) => i.Process(It.IsAny())).returnsAsync()
