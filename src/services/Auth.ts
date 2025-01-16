import api from "./api.ts";

export class Auth {
  static login({username, password}: { username: string, password: string }): Promise<{ data: LoginResponse }> {
    return api.post(`/login`, {
      username,
      password
    })
  }
}