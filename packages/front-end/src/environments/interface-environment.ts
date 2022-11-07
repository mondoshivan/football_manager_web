import { LogLevel } from "src/app/services/log/log-level"

export interface IEnvironment {
    production: boolean
    name: string
    server: {
      protocol: 'http' | 'https'
      host: string
      port: number
      logLevel: LogLevel
    }
  }