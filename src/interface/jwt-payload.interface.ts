export interface JwtPayload {
    sub: number;  // The user ID (or any other unique identifier)
    username: string;  // The username of the user (optional)
  }