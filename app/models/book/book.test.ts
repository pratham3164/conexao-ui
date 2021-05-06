import { BookModel } from "./book"

test("can be created", () => {
  const instance = BookModel.create({})

  expect(instance).toBeTruthy()
})
