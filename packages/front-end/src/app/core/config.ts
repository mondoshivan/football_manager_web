interface Config {
  [key: string]: string;
  auth: "session" | "token";
}

// Session auth needs to use the same origin anyway
export const config: Config = {
  apiUrl: "/api/1",
  adminUrl: "api/1/admin",
  authUrl: "/api/1/auth",
  auth: "token",
};