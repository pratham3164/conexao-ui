import apiClient from "./client"

const getBooks = async () => {
  try {
    console.log("fetching.......")
    const response = await apiClient.get("/books")
    console.log("fetched")
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log("eRRor")
    return []
  }
}
const getLiked = async () => {
  try {
    const response = await apiClient.get("/wishlist/2")
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log("eRRor")
    return []
  }
}

const toggleLiked = async (id, toggle) => {
  try {
    const str = toggle ? "/addWishlist" : "/removeWishlist"
    const response = await apiClient.post(str, { userid: 2, bookid: id })
    if (response.data.success) {
      return "success"
    }
  } catch (error) {
    console.log("eRRor")
    return null
  }
}

const getIssues = async (id) => {
  const str = `/issues/` + id
  try {
    const response = await apiClient.get(str)
    console.log("issues fetched")
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log("eRRor")
    return null
  }
}

const addIssue = async (userid, bookid) => {
  try {
    const response = await apiClient.post("/issue", {
      userid: userid,
      bookid: bookid,
    })
    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log("eRRor")
    return null
  }
}

const returnBook = async (bookid, userid, fine) => {
  console.log("Api call")
  try {
    const response = await apiClient.post("/return", {
      userid: userid,
      bookid: bookid,
      fine: fine,
    })

    if (response.data.success) {
      return response.data.data
    }
  } catch (error) {
    console.log("eRRor")
    return null
  }
}

export default {
  getBooks,
  getLiked,
  toggleLiked,
  getIssues,
  returnBook,
  addIssue,
}
