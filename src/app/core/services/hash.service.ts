import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import * as fs from 'fs';
const fsPromise = fs.promises;

@Injectable({ providedIn: 'root' })
export class HashService {
  constructor() {}

  private hashPortion = async (
    path,
    { start, end } = { start: 0, end: Infinity }
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const output = crypto.createHash('md5');
      const input = fs.createReadStream(path, { start, end });

      input.on('error', (err) => {
        reject(err);
      });

      output.once('readable', () => {
        resolve(output.read().toString('hex'));
      });

      input.pipe(output);
    });
  };

  public async hashFile(path, threshold = 128 * 1024) {
    // get file size
    const stat = fsPromise.stat(path);
    const size = (await stat).size;

    // if smaller than threshold, hash the entire file
    if (size < threshold) {
      return this.hashPortion(path);
    }

    // else sample start, middle and file end
    const chunkSize = Math.floor(threshold / 3);
    const startHash: string = await this.hashPortion(path, {
      start: 0,
      end: chunkSize,
    });

    const midStart = Math.floor(size / 2);
    const middleHash: string = await this.hashPortion(path, {
      start: midStart,
      end: midStart + chunkSize,
    });

    const endHash: string = await this.hashPortion(path, {
      start: size - chunkSize,
      end: undefined,
    });

    // return hash of all samplings
    const output = crypto.createHash('md5');
    output.update(startHash + middleHash + endHash);
    return output.digest('hex');
  }
}
