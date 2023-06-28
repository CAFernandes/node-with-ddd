import Cookies from 'js-cookie';

type RefreshJwtService = {
  accessToken: string
}

export class ApiClient {
  private baseUrl: string
  private accessToken: string | null
  private refreshToken: string | null

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.accessToken = Cookies.get('accessToken') || null
    this.refreshToken = Cookies.get('refreshToken') || null
  }

  clearTokens() {
    this.accessToken = null
    this.refreshToken = null
    localStorage.removeItem('user')
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }

  setAccessToken(token: string | null) {
    this.accessToken = token
    if (!this.accessToken) {
      Cookies.remove('accessToken')
    } else {
      Cookies.set('accessToken', this.accessToken, { secure: true })
    }
  }

  setRefreshToken(token: string | null) {
    this.refreshToken = token
    if (!this.refreshToken) {
      Cookies.remove('refreshToken')
    } else {
      Cookies.set('refreshToken', this.refreshToken, { secure: true })
    }
  }

  private async revalidateToken(): Promise<void> {
    try {
      const response = (await this.post('/auth/refresh-token', {
        refreshToken: this.refreshToken,
      })) as RefreshJwtService
      const { accessToken } = response
      this.setAccessToken(accessToken)
    } catch (error) {
      console.error('Erro na revalidação do token:', error)
    }
  }

  private async request(
    url: string,
    options?: RequestInit,
    isRevalidate = false
  ): Promise<Response> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, options)
      console.log(isRevalidate)
      if (!response.ok) {
        if (response.status === 401 && !isRevalidate) {
          await this.revalidateToken()
          return this.request(url, options, true)
        }
        throw new Error(`Request failed with status ${response.status}`)
      }

      return response
    } catch (error) {
      console.error('Network error:', error)
      throw new Error('Failed to make the request.')
    }
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.request(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    })
    return response.json()
  }

  public async post<T>(url: string, body: object): Promise<T> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    }
    const response = await this.request(url, options)
    return response.json()
  }

  public async put<T>(url: string, body: object): Promise<T> {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    }
    const response = await this.request(url, options)
    return response.json()
  }

  public async delete(url: string): Promise<void> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    }
    await this.request(url, options)
  }
}
