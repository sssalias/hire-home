class TokenService {
  private readonly _key = 'token'

  setToken(token: string) {
    localStorage.setItem(this._key, token)
  }

  getToken() {
    return localStorage.getItem(this._key)
  }

  hasToken(): boolean {
    return !!this.getToken()
  }

  removeToken(): void {
    localStorage.removeItem(this._key)
  }
}

export default new TokenService()
