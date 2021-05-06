import { IssueStoreModel } from "./issue-store"

test("can be created", () => {
  const instance = IssueStoreModel.create({})

  expect(instance).toBeTruthy()
})
