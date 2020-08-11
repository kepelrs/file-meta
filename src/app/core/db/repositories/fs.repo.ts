import { EntityRepository, Repository, Brackets } from 'typeorm';
import { File } from '../entities/file.entity';

@EntityRepository(File)
export class CustomFsRepo extends Repository<File> {
  async filesHaveMetadata(
    pathAndSizes: { path: string; sizeInBytes: number }[]
  ) {
    console.log(pathAndSizes);

    console.time('filesHaveMetadata: ');
    if (!Array.isArray(pathAndSizes) || !pathAndSizes.length) {
      return;
    }

    const qb = this.createQueryBuilder('file')
      .select('count(*)', 'c')
      .addSelect('file.path')
      .addSelect('file.sizeInBytes');

    for (let i = 0; i < pathAndSizes.length; i++) {
      const pathAndSize = pathAndSizes[i];
      if (i === 0) {
        qb.where(
          new Brackets((qb) => {
            qb.where('file.path = :path', {
              path: pathAndSize.path,
            }).andWhere('file.sizeInBytes = :sizeInBytes', {
              sizeInBytes: pathAndSize.sizeInBytes,
            });
          })
        );
      } else {
        qb.orWhere(
          new Brackets((qb) => {
            qb.where('file.path = :path', {
              path: pathAndSize.path,
            }).andWhere('file.sizeInBytes = :sizeInBytes', {
              sizeInBytes: pathAndSize.sizeInBytes,
            });
          })
        );
      }
    }

    console.log(await qb.getRawMany());
    console.timeEnd('filesHaveMetadata: ');
  }
}
