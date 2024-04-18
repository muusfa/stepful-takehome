import { createReadStream } from 'fs';
import * as csv from 'csv-parser';

export function readCsv<T>(path: string, options): Promise<T[]> {
  return new Promise((res, rej) => {
    const result: T[] = [];
    createReadStream(path)
      .pipe(csv(options))
      .on('data', (data) => {
        result.push(data);
      })
      .on('end', () => {
        return res(result.slice(1));
      })
      .on('error', (err) => {
        console.log(err);
        rej(err);
      });
  });
}

export function randBetween(
  min: number,
  max: number,
  fixed: number = 0,
): number {
  const calc = min + Math.random() * (max - min + 1);
  return Number(calc.toFixed(fixed));
}

export function getRandomDateWithinTenDays(): Date {
  const currentDate = new Date(); // Current date and time
  const futureDate = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000); // Date 10 days from now

  const randomTimestamp =
    currentDate.getTime() +
    Math.random() * (futureDate.getTime() - currentDate.getTime());
  const randomDate = new Date(randomTimestamp);

  return randomDate;
}
