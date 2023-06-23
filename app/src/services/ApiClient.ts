import Cookies from 'js-cookie';

type RefreshJwtService = {
  accessToken: string;
}

export class ApiClient {
  private baseUrl: string;
  private accessToken: string | null;
  private refreshToken: string | null;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.accessToken = Cookies.get('accessToken') || null;
    this.refreshToken = Cookies.get('refreshToken') || null;

    if (this.refreshToken) {
      this.revalidateToken();
    }
  }

  setAccessToken(token: string | null) {
    this.accessToken = token;
    if (!this.accessToken) return Cookies.remove('accessToken');
    Cookies.set('accessToken', this.accessToken, { secure: true });
  }

  setRefreshToken(token: string | null) {
    this.refreshToken = token;
    if (!this.refreshToken) return Cookies.remove('refreshToken');
    Cookies.set('refreshToken', this.refreshToken, { secure: true });
  }
  async revalidateToken() {
    try {
      const response = await this.post('/auth/refresh-token', { refreshToken: this.refreshToken })
      const { accessToken } = response as RefreshJwtService;
      this.setAccessToken(accessToken);
    } catch (error) {
      console.error('Erro na revalidação do token:', error);
      return null;
    }
  }

  private async request(url: string, options?: RequestInit): Promise<Response> {
    const response = await fetch(`${this.baseUrl}${url}`, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response;
  }

  public async get<T>(url: string): Promise<T> {
    const response = await this.request(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
    return response.json();
  }

  public async post<T>(url: string, body: object): Promise<T> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    };
    const response = await this.request(url, options);
    return response.json();
  }

  public async put<T>(url: string, body: object): Promise<T> {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    };
    const response = await this.request(url, options);
    return response.json();
  }

  public async delete(url: string): Promise<void> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    };
    await this.request(url, options);
  }
}
