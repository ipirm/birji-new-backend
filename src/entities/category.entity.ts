import {Column, Entity, JoinTable, ManyToMany, OneToMany} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {PostEntity} from "./post.entity";
import {TagEntity} from "./tag.entity";

@Entity('category')

export abstract class CategoryEntity extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: true})
    title: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    description: string;

    @OneToMany(() => PostEntity, post => post.category)
    posts?: PostEntity[];

    @ManyToMany(() => TagEntity)
    @JoinTable()
    tags?: TagEntity[];
}