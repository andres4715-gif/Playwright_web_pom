import { APIRequestContext, request } from '@playwright/test';
import { ApiResponse } from '../types/api.types';

export class BasePage {
  protected baseURL: string;
  protected request!: APIRequestContext;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public async initialize(): Promise<void> {
    this.request = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const response = await this.request.get(endpoint);
    const status = response.status();
    
    if (status >= 400) {
      throw new Error(`GET request failed with status ${status}`);
    }
    
    return await response.json() as T;
  }

  protected async post<T, R>(endpoint: string, data: T): Promise<R> {
    const response = await this.request.post(endpoint, {
      data: data,
    });
    const status = response.status();
    
    if (status >= 400) {
      throw new Error(`POST request failed with status ${status}`);
    }
    
    return await response.json() as R;
  }

  protected async put<T, R>(endpoint: string, data: T): Promise<R> {
    const response = await this.request.put(endpoint, {
      data: data,
    });
    const status = response.status();
    
    if (status >= 400) {
      throw new Error(`PUT request failed with status ${status}`);
    }
    
    return await response.json() as R;
  }

  protected async patch<T, R>(endpoint: string, data: Partial<T>): Promise<R> {
    const response = await this.request.patch(endpoint, {
      data: data,
    });
    const status = response.status();
    if (status >= 400) {
        throw new Error(`PATCH request failed with status ${status}`);
      }
      
      return await response.json() as R;
    }
  
    protected async delete<R>(endpoint: string): Promise<R> {
      const response = await this.request.delete(endpoint);
      const status = response.status();
      
      if (status >= 400) {
        throw new Error(`DELETE request failed with status ${status}`);
      }
      
      return await response.json() as R;
    }
  
    // Method to obtain headers and other response details
    protected async getWithFullResponse<T>(endpoint: string): Promise<ApiResponse<T>> {
      const response = await this.request.get(endpoint);
      const status = response.status();
      const data = await response.json() as T;
      const headersObj: Record<string, string> = {};
      
      const headers = response.headers();
      Object.keys(headers).forEach(key => {
        headersObj[key] = headers[key] || '';
      });
      
      return {
        status,
        data,
        headers: headersObj
      };
    }
  }