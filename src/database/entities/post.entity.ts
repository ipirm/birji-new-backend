import {Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, BeforeInsert} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {User} from "./user.entity";
import {Like} from "./like.entity";
import {Category} from "./category.entity";
import {Tag} from "./tag.entity";
import {default as slugify} from 'slugify';

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
    slug: string;

    @BeforeInsert()
    async generateSlug(): Promise<void> {
        this.slug = await slugify(this.title, {lower: true, replacement: '-'})
    }

    @Column({type: 'varchar', length: 500, nullable: true})
    description: string;

    @Column({type: 'varchar', length: 10000, nullable: true})
    text: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    likeCount: number;

    @Column({type: 'varchar', length: 500, nullable: true})
    reviewCount: number;

    @Column({type: 'varchar', length: 500, nullable: true})
    savedCount: number;

    @Column({type: 'boolean', default: true})
    draft: boolean;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Like, like => like.post, {cascade: true})
    likes?: Like[];

    @ManyToOne(() => Category, category => category.posts)
    @JoinColumn({name: 'categoryId'})
    category?: Category;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags?: Tag[];
}