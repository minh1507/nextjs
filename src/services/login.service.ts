import axios from "axios";

export function Login(data: any) {
  return axios.post("http://localhost:4000/api/auth/login", {username: data.username, password: data.password});
}
