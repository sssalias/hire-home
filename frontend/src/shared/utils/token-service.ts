class TokenService {
  setToken(token: string) {
    localStorage.setItem('token', token)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  hasToken(): boolean {
    return !!this.getToken()
  }
}

export default new TokenService()
