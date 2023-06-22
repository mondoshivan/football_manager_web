import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from "uuid";

class Utils {

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
}

export default Utils;