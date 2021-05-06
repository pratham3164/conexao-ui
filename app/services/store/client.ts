import axios from "axios"

// http://192.168.37.194:3005/books
export default axios.create({
  baseURL: "http://192.168.131.194:3003",
})
