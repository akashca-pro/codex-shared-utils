declare module 'express' {
  interface Request {
    userId?: string;
    role?: string;
    email?: string;
    accessTokenId?:string;
    refreshTokenId?:string;
    accessTokenExp? : number;
    refreshTokenExp? : number;
    validated? : Record<
    'body' | 'query' | 'params',
     any>;
  }
}

export interface CustomJwtPayload {
    userId : string;
    email : string;
    role : string;
    tokenId : string;
    exp : number;
    iat : number;
}