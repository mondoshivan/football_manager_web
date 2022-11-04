interface Config {
  [key: string]: string;
  auth: "session" | "token";
}

// Session auth needs to use the same origin anyway
export const authConfig: Config = {
  apiUrl: "/api/1",
  adminUrl: "api/1/admin",
  authUrl: "/api/1/auth",
  auth: "token"
};

export const apiConfig = {
  apiUrl: "/api/1"
};