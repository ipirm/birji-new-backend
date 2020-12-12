import {Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {User} from "./user.entity";
import {Like} from "./like.entity";
import {Category} from "./category.entity";
import {Tag} from "./tag.entity";

@Entity('posts')

export class PostData extends BaseEntity {

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

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Like, like => like.post, {cascade: true})
    likes?: Like[];

    @ManyToOne(() => Category, category => category.posts)
    category?: Category;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags?: Tag[];
}