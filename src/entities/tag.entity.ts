import {Column, Entity} from 'typeorm'
import {BaseEntity} from "./base.entity";

@Entity('tags')

export abstract class TagEntity extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: true})
    title: string;

}