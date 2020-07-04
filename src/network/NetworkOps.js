import { get } from 'lodash';
import { urlFor } from './Urls';

export class NetworkOps {
  init(auth) {
    this.auth = auth;
  }

  async getRequest(type, options?): any {
    const headerOverrides = get(options, 'headerOverrides', {});
    let request = {
      method: type,
      headers: {
        // Accept: 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...headerOverrides
      },
    };

    if (this.auth.authToken) {
      request.headers = {
        ...request.headers,
        Authorization: `bearer ${this.auth.authToken}`,
        distributorId: this.auth.distributorID
      }
    }
    return request;
  }

  async wrapperWithOptions(url: string, request: any) {
    try {
        const response = await fetch(url, request);
        if (!response.ok) {
          if (response.status === 401) {
            if (this.auth.authToken) {
              alert('Token Expired')
            }
          }
          else if (response.status === 500 && response.status === 400) {
            console.log('Got 401, now calling logout', response);
          }
          const err = await response.json();
          const newError = new Error(get(err, 'title'));
          newError.name = response.status
          throw newError;
        }
        else {
          const res = await response.text();
          try {
          return JSON.parse(res);
          } 
          catch {
            return res;
          }
        }
    }
    catch (error) {
      console.log('Error', error);
      return error;
    }
  }

  postToJson = async (service: ServiceType, data: any): Promise<*> => {
    try {
      const JSONData = new URLSearchParams(data);
      return this.postRaw(service, JSONData)
    }
    catch (err) {
      throw err;
    }
  }

  postRaw = async (service: ServiceType, data: any, options?: any): Promise<*> => {
    try {
      const request = await this.getRequest('POST', options);
      request.body = data;
      return this.wrapperWithOptions(urlFor(service), request)
    }
    catch (err) {
      throw err;
    }
  }

  putToJson = async (service: ServiceType, data: any): Promise<*> => {
    try {
      const request = await this.getRequest('PUT');
      request.body = new URLSearchParams(data);
      return this.wrapperWithOptions(urlFor(service), request)
    }
    catch (err) {
      throw err;
    }
  }

  get = async (service: ServiceType): Promise<*> => {
    try {
      const request = await this.getRequest('GET');
      return this.wrapperWithOptions(urlFor(service), request)
    }
    catch (err) {
      throw err;
    }
  }

  delete = async (service: ServiceType): Promise<*> => {
    try {
      const request = await this.getRequest('DELETE');
      return this.wrapperWithOptions(urlFor(service), request)
    }
    catch (err) {
      throw err;
    }
  }

  getRaw = async (service: string): Promise<*> => {
    try {
      const request = await this.getRequest('GET');
      return this.wrapperWithOptions(service, request)
    }
    catch (err) {
      throw err;
    }
  }
}

export default new NetworkOps();
