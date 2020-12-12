import {Column, Entity} from 'typeorm'
import {BaseEntity} from "./base.entity";

@Entity('tags')

export class Tag extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: true})
    title: string;

}