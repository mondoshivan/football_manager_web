import { ILogObject, Logger } from "tslog";

function logToTransport(logObject: ILogObject) {
    if (logObject.logLevel === 'fatal') process.exit(1);
}

const log: Logger = new Logger({ 
    name: "FM-Logger",
    minLevel: "silly"
});

log.attachTransport({
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
    },
    "debug"
);

export default log;