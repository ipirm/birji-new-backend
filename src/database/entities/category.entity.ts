import {Column, Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {PostData} from "./post.entity";
import {Tag} from "./tag.entity";

@Entity('category')

export class Category extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: true})
    title: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    description: string;

    @OneToMany(() => PostData, post => post.category)
    posts?: PostData[];

    @ManyToMany(() => Tag)
    @JoinTable()
    tags?: Tag[];
}