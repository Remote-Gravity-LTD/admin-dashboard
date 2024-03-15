import axios from "axios";

let token: string | null = "";
if (typeof window !== "undefined") {
  // Perform localStorage action
  token = localStorage.getItem("token");
  console.log("tokennn", token);
}
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: " Bearer " + token,
    Accept: "application/json",
    "content-Type": "application/json",
  },
});

export default http;
