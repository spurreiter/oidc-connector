
export interface OidcError extends Error {
  status?: number;
  description?: string;
}

export interface Promised extends Promise<any> {
  resolve: Function;
  reject: Function;
}
