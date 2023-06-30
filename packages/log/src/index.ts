import { ILogObj, Logger } from "tslog";
import { join } from "path";
import { appendFileSync, existsSync, mkdirSync } from "fs";

/**
 * enum of the available log levels.
 */
export enum LogLevel {
  SILLY = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6
}

/**
 * CLRWLogger extends the tslog Logger with some convenient methods.
 */
export class CLRWLogger<T> extends Logger<T> {

  /**
   * Converts the log level from string to number.
   * The default value level is debug.
   * 
   * @param level LogLevelStr: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
   * @returns LogLevel as number
   */
  static logLevelStr2Enum(level: LogLevelStr): LogLevel {
    if (level.toLowerCase() === 'silly') return LogLevel.SILLY;
    if (level.toLowerCase() === 'trace') return LogLevel.TRACE;
    if (level.toLowerCase() === 'debug') return LogLevel.DEBUG;
    if (level.toLowerCase() === 'info') return LogLevel.INFO;
    if (level.toLowerCase() === 'warn') return LogLevel.WARN;
    if (level.toLowerCase() === 'error') return LogLevel.ERROR;
    if (level.toLowerCase() === 'fatal') return LogLevel.FATAL;

    return LogLevel.DEBUG;
  }

  /**
   * Is the log level debug?
   * @returns true if log level is debug and false otherwise;
   */
  public isDebug(): boolean {
    return this.settings.minLevel === LogLevel.DEBUG;
  }
}

/**
 * Available log level as string representation.
 */
type LogLevelStr = 'silly' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

let logLevel = LogLevel.DEBUG;
if (process.env['LOG_LEVEL'] && ['silly', 'trace', 'debug', 'info', 'warn', 'error', 'fatal'].includes(process.env['LOG_LEVEL'])) {
  logLevel = CLRWLogger.logLevelStr2Enum(process.env['LOG_LEVEL'] as LogLevelStr);
} else if (process.env['NODE_ENV'] === "production") {
  logLevel = LogLevel.WARN;
} else if (process.env['NODE_ENV'] === "test") {
  logLevel = LogLevel.ERROR;
}

const log: CLRWLogger<ILogObj> = new CLRWLogger({
  prettyLogTemplate: "{{yyyy}}-{{mm}}-{{dd}}T{{hh}}:{{MM}}:{{ss}}.{{ms}}Z {{logLevelName}}\t[{{filePathWithLine}}{{name}}] ",
  prettyLogTimeZone: 'local',
  minLevel: logLevel
});


if (process.env['CLRW_LOG_TO_FILE'] === 'true') {

  let logFolder = '';

  if (process.env['CLRW_HOME']) {

    // in docker containers CLRW_HOME is not set,
    // so we need to define a default value
    const home = process.env['CLRW_HOME'];

    // CLRW_ENV is set for stage and production,
    // dev is the default environment
    const env = process.env['CLRW_ENV'] || 'dev';

    if (!process.env['CLRW_LOG_PROCESS']) {

      // Using console and not log here, 
      // because simple-node-logger does not log synchronus,
      // which guarantees that the following message
      // is printed before the process exits.
      console.error('CLRW_LOG_PROCESS is not set.');
      process.exit(1);
    }

    const processName = process.env['CLRW_LOG_PROCESS'];

    logFolder = join(home, 'environments', env, 'logging', processName);

  } else {
    logFolder = '/var/log/clrw';
  }

  if (!existsSync(logFolder)) {

    mkdirSync(logFolder, { recursive: true });
  }

  const logFilePath = join(logFolder, 'process.log');

  log.attachTransport((logObj) => {
    const text = Object.keys(logObj).filter(k => k !== '_meta').map(k => logObj[k]).join('\n');
    const date = logObj._meta.date.toISOString();
    const level = logObj._meta.logLevelName;
    appendFileSync(logFilePath, `${date} ${level}\t${text}\n`);
  });
}

export default log;