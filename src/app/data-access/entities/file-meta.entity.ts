import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class FileMeta extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    name: string;

    @Column()
    size: string;

    @Column()
    md5: string;
}
