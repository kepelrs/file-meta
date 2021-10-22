import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import * as fs from 'fs';
const fsPromise = fs.promises;

@Injectable({ providedIn: 'root' })
export class HashService {
  constructor() {}

  // TODO: Consider shared buffer to improve performance
  private hashPortionSync(path: string, start: number, end: number): string {
    if (start < 0 || end <= start) {
      throw new Error('bad start, end');
    }

    const size = end - start;
    const buf = Buffer.alloc(size);
    const fd = fs.openSync(path, 'r');
    fs.readSync(fd, buf, 0, size, start);
    fs.closeSync(fd);
    return buf.toString('utf8');
  }

  /** Includes fileSize in the hash: helps reduce potential collisions in larger sampled files */
  public hashFileSync(path, threshold = 128 * 1024) {
    const output = crypto.createHash('md5');
    // get file size
    const stat = fs.statSync(path);
    const size = stat.size;

    // if smaller than threshold, hash the entire file
    if (size < threshold) {
      const fileHash = this.hashPortionSync(path, 0, size);
      output.update(fileHash + String(size));
      return output.digest('hex');
    }

    const chunkSize = Math.floor(threshold / 3);
    const sampleStart = this.hashPortionSync(path, 0, chunkSize);

    const midStart = Math.floor(size / 2);
    const sampleMiddle = this.hashPortionSync(
      path,
      midStart,
      midStart + chunkSize
    );

    const sampleEnd = this.hashPortionSync(path, size - chunkSize, size);

    // return hash of all samplings
    output.update(sampleStart + sampleMiddle + sampleEnd + String(size));
    return output.digest('hex');
  }

  /*
   *
   *
   * Below async functions are less performant and probably going to be deprecated.
   *
   *
   */
  private async hashPortion(
    path,
    { start, end } = { start: 0, end: Infinity }
  ): Promise<string> {
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
  }

  public async hashFile(path, threshold = 128 * 1024) {
    const output = crypto.createHash('md5');
    // get file size
    const stat = fsPromise.stat(path);
    const size = (await stat).size;

    // if smaller than threshold, hash the entire file
    if (size < threshold) {
      const fileHash = await this.hashPortion(path);
      output.update(fileHash + String(size));
      return output.digest('hex');
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
    output.update(startHash + middleHash + endHash + String(size));
    return output.digest('hex');
  }
}
