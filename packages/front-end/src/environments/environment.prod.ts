import { LogLevel } from "src/app/services/log/log-level"
import { IEnvironment } from "./interface-environment";

export const environment : IEnvironment = {
  production: true,
  name: 'production',
  server: {
    protocol: 'http',
    host: '0.0.0.0',
    port: 8082,
    logLevel: LogLevel.Warn
  }
};
