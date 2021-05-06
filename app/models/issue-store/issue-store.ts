import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
// import BookStore from "../book-store/book-store"

import API from "../../services/store/library-ap"

/**
 * Model description here for TypeScript hints.
 */
export const IssueModel = types.model("IssueModel").props({
  bookid: types.number,
  fine: types.number,
  image: types.string,
  issuedate: types.string,
  name: types.string,
  returndate: types.string,
  returned: types.number,
})

export const IssueStoreModel = types
  .model("IssueStore")
  .props({
    issues: types.array(IssueModel),
    state: types.enumeration("State", ["pending", "done", "error"]),
    idList: types.optional(types.array(types.number), []),
  })
  .views((self) => ({
    // get idList() {
    //   const lst: Array<number> = []
    //   self.issues.forEach((iss) => {
    //     if (!iss.returned) {
    //       lst.push(iss.bookid)
    //     }
    //   })
    //   return lst
    // },
  }))
  .actions((self) => ({
    findById: (id) => {
      console.log(id)
      return self.issues.find((issue) => issue.bookid === id)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchIssues: flow(function* (id) {
      try {
        self.state = "pending"
        const response = yield API.getIssues(id)
        self.issues = response
        self.issues.forEach((iss) => {
          if (!iss.returned) {
            self.idList.push(iss.bookid)
          }
        })
        self.state = "done"
      } catch (error) {
        self.state = "error"
      }
    }),
    returnBook: flow(function* (data) {
      const bookId = data.bookId
      const userId = data.userId
      const fine = data.fine
      console.log("returned  " + bookId) //Todo:
      try {
        const issue = self.findById(bookId)
        console.log(issue.name)
        issue.returned = 1
        const response = yield API.returnBook(bookId, userId, fine)
        for (let i = 0; i < self.idList.length; i++) {
          if (self.idList[i] === 5) {
            self.idList.splice(i, 1)
          }
        }
      } catch (error) {
        self.state = "error"
      }
    }),
    addIssue: flow(function* (data) {
      const bookId = data.bookId
      const userId = data.userId
      console.log(bookId + "------" + userId)
      try {
        const response = yield API.addIssue(userId, bookId)
        self.idList.push(bookId)
      } catch (error) {
        self.state = "error"
      }
    }),
  }))
// eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

const Issues = IssueStoreModel.create({ issues: [], state: "pending" })
export default Issues
// type IssueStoreType = Instance<typeof IssueStoreModel>
// export interface IssueStore extends IssueStoreType {}
// type IssueStoreSnapshotType = SnapshotOut<typeof IssueStoreModel>
// export interface IssueStoreSnapshot extends IssueStoreSnapshotType {}
// export const createIssueStoreDefaultModel = () => types.optional(IssueStoreModel, {})
