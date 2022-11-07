import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LogLevel } from './log-level';

@Injectable({
    providedIn: 'root'
  })
export class LogService {

    level: LogLevel = environment.server.logLevel;

    debug(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Debug, optionalParams);
    }
    
    info(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Info, optionalParams);
    }
    
    warn(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Warn, optionalParams);
    }
    
    error(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Error, optionalParams);
    }
    
    fatal(msg: string, ...optionalParams: any[]) {
        this.writeToLog(msg, LogLevel.Fatal, optionalParams);
    }

    date() : string {
        const timeZoneOffset = 60000; // in milli sec
        const tzoffset = (new Date()).getTimezoneOffset() * timeZoneOffset;
        return (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1) + 'CET';
    }

    private shouldLog(level: LogLevel): boolean {
        let ret: boolean = false;
        if ((level >= this.level && level !== LogLevel.Off) || this.level === LogLevel.All) {
            ret = true;
        }
        return ret;
    }

    private formatParams(params: any[]): string {
        let ret: string = params.join(",");
        
        // Is there at least one object in the array?
        if (params.some(p => typeof p == "object")) {
            ret = "";
            
            // Build comma-delimited string
            for (let item of params) {
                ret += JSON.stringify(item) + ",";
            }
        }
        return ret;
    }

    private writeToLog(msg: string, level: LogLevel, params: any[]) {
        if (this.shouldLog(level)) {
            let value: string = "%c";
            
            value += this.date();
            value += " " + LogLevel[this.level] + ": ";
            value += msg;
            if (params.length) {
                value += " " + this.formatParams(params);
            }
            
            console.log(value);
        }
    }
}