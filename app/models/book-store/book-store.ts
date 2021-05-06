import { Toggle } from "react-powerplug"
import { BookModel } from "./../book/book"
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"

import API from "../../services/store/library-ap"

/**
 * Model description here for TypeScript hints.
 */
export const BookStoreModel = types
  .model("BookStore")
  .props({
    books: types.array(BookModel),
    state: types.enumeration("State", ["pending", "done", "error"]),
  })
  .views((self) => ({
    get getWishList() {
      return self.books.filter((item) => item.liked === true)
    },
  }))
  .actions((self) => ({
    findById: (id) => self.books.find((book) => book.id === id),
  }))
  .actions((self) => ({
    setLikes(list) {
      self.books.forEach((item) => {
        if (list.includes(item.id)) {
          self.books[item.id - 1].liked = true
        }
      })
    },
  }))
  // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    toggleLike: flow(function* (id) {
      const book = self.findById(id)

      try {
        book.liked = !book.liked

        const response = yield API.toggleLiked(id, book.liked)
        // if (response !== "success") {
        //   book.liked = !book.liked
        // }
      } catch (error) {}
    }),
    getBooks: flow(function* getBooks() {
      self.state = "pending"
      console.log("fetching data")
      try {
        const response = yield API.getBooks()
        const likedList = yield API.getLiked()
        self.books = response
        self.setLikes(likedList)
        self.state = "done"
        console.log(response.length)
      } catch (error) {
        self.state = "error"
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

const book = BookStoreModel.create({
  books: [],
  state: "pending",
})

export default book

// type BookStoreType = Instance<typeof BookStoreModel>
// export interface BookStore extends BookStoreType {}
// type BookStoreSnapshotType = SnapshotOut<typeof BookStoreModel>
// export interface BookStoreSnapshot extends BookStoreSnapshotType {}
// export const createBookStoreDefaultModel = () => types.optional(BookStoreModel, {})
