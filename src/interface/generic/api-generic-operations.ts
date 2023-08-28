export interface ApiOperations<T> {
  get(endpoint: string): Promise<T>;
  post(endpoint: string, data: any): Promise<T>;
  put(endpoint: string, data: any): Promise<T>;
  delete(endpoint: string): Promise<void>;
}