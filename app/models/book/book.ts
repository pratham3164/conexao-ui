import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BookModel = types
  .model("Book")
  .props({
    id: types.number,
    name: types.string,
    author: types.string,
    image: types.string,
    publisher: types.string,
    genre: types.string,
    language: types.string,
    description: types.string,
    year: types.number,
    count: types.number,
    liked: types.optional(types.boolean, false),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    // toggleLiked() {
    //   self.liked = !self.liked
    // },
    addCount() {
      self.count = self.count + 1
    },
    removeCount() {
      self.count = self.count - 1
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type BookType = Instance<typeof BookModel>
export interface Book extends BookType {}
type BookSnapshotType = SnapshotOut<typeof BookModel>
export interface BookSnapshot extends BookSnapshotType {}
export const createBookDefaultModel = () => types.optional(BookModel, {})
