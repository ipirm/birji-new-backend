import {Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {UsersEntity} from "./user.entity";
import {LikeEntity} from "./like.entity";
import {CategoryEntity} from "./category.entity";
import {TagEntity} from "./tag.entity";

@Entity('posts')

export abstract class PostEntity extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: true})
    meta_title: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    meta_description: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    meta_keywords: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    title: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    description: string;

    @Column({type: 'varchar', length: 10000, nullable: true})
    text: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    likeCount: number;

    @Column({type: 'varchar', length: 500, nullable: true})
    reviewCount: number;

    @ManyToOne(() => UsersEntity, user => user.posts)
    user: UsersEntity;

    @OneToMany(() => LikeEntity, like => like.post, {cascade: true})
    likes?: LikeEntity[];

    @ManyToOne(() => CategoryEntity, category => category.posts)
    category?: CategoryEntity;

    @ManyToMany(() => TagEntity)
    @JoinTable()
    tags?: TagEntity[];
}