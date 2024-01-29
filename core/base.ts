import axios, { AxiosInstance } from "axios";

export class BaseRepository {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://220.158.233.220:8080",
    });
  }

  async get(url: string) {
    return this.axiosInstance.get(url);
  }

  async put(url: string, data: any) {
    return this.axiosInstance.put(url, data);
  }

  async delete(url: string) {
    return this.axiosInstance.delete(url);
  }

  async post(url: string, data: any) {
    return this.axiosInstance.post(url, data);
  }

  async checkError(response: any) {
    console.log(response.status);
    if (response.code >= 400 && response.code < 600) {
      console.log(response);
      return null;
    }
    return response.data;
  }
}
