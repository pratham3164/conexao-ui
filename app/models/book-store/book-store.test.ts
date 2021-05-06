import { BookStoreModel } from "./book-store"

test("can be created", () => {
  const instance = BookStoreModel.create({})

  expect(instance).toBeTruthy()
})
