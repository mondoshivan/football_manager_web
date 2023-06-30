import CryptoJS from 'crypto-js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from "uuid";

export class Utils {

  static uuid(): string {
    return uuidv4();
  }

  static passwordHash(password: string, salt: string): string {
    return CryptoJS.SHA256(`${password}${salt}`).toString();
  }

  static randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  static randomBirthday(youngest: number, oldest: number): Date {
    const now = Date.now();
    const old = now - 1000 * 60 * 60 * 24 * 365 * oldest;
    const young = now - 1000 * 60 * 60 * 24 * 365 * youngest;
    return new Date(Utils.randomIntFromInterval(old, young));
  }

  static ageBetweenDates(before: Date, after: Date) {
    const ageDifMs = after.valueOf() - before.valueOf();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  static isDateBetween(from: Date, to: Date, check: Date) {
    const checkTimestamp = check.getTime();
    return checkTimestamp <= to.getTime() && checkTimestamp >= from.getTime();
  }

  /**
   * Returns the directory of the file where this method is called.
   * @param url call it like this: Utils.__dirname(import.meta.url)
   * @returns directory of the file, where this method is called.
   */
  static __dirname(url: string): string {
    const __filename = fileURLToPath(url);
    return dirname(__filename);
  }

  /**
   * Returns the 'packages' dir as absolute path.
   * @returns packages dir
   */
  static getPackagesDir() {
    const cwd = process.cwd();
    if (!cwd) return;

    const components = cwd.split('/');
    while(components.length > 0) {
      if (components.pop() === 'packages') {
        return join(components.join('/'), 'packages');
      }
    }
  }
}