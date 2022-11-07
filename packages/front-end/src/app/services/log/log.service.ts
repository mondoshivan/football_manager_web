import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class LogService {
    log(msg: any) {
        const timeZoneOffset = 60000; // in millisec
        const tzoffset = (new Date()).getTimezoneOffset() * timeZoneOffset;
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1) + 'CET';
        console.log(localISOTime + ": " + JSON.stringify(msg))
    }
}