import { AxiosInstanceBuilder } from '@dile/crud/lib/AxiosInstanceBuilder';

export class AxiosService {
  constructor(tokenService) {
    this.tokenService = tokenService;
    this.configuration = {
      baseURL: import.meta.env.VITE_API_BASE_URL,
    };
  }

  createInstance() {
    let configuration = this.configuration;
    if(this.tokenService.token) {
      configuration = {
        ...this.configuration,
        headerAuthorization: `Bearer ${this.tokenService.token}`,
      }
    }
    let axiosInstanceBuilder = new AxiosInstanceBuilder(configuration);
    return axiosInstanceBuilder.getInstance();
  }

  updateToken(token) {
    this.tokenService.storeToken(token);
    this.createInstance();
  }

  removeToken() {
    this.tokenService.removeToken();
    this.createInstance();
  }
}