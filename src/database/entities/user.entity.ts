import {Entity, Column, OneToMany, BeforeInsert} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {PostData} from "./post.entity";
import {Like} from "./like.entity";
import * as bcrypt from 'bcrypt'

enum Roles {
    Admin = 'admin',
    User = 'user',
}

@Entity('user')

export class User extends BaseEntity {

    @Column({type: 'varchar', length: 500, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    last_name: string;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    full_name: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    likeCount: number;

    @Column({type: 'varchar', length: 500, nullable: true})
    reviewCount: number;

    @Column({type: 'varchar', length: 500, nullable: true})
    savedCount: number;

    @BeforeInsert()
    async generateFullName(): Promise<void> {
        this.full_name = this.name + this.last_name
    }

    @Column({type: 'varchar', length: 500, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    city: string;

    @Column({type: 'varchar', length: 500, nullable: false, select: false})
    password: string;

    @Column({type: 'varchar', length: 500, nullable: true})
    avatar: string;

    @BeforeInsert()
    async generatePasswordHash(): Promise<void> {
        this.password = await bcrypt.hashSync(this.password, bcrypt.genSaltSync(this.salt))
    }

    @Column({type: 'integer', default: 10, select: false})
    salt: number;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    facebook_id: number;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    google_id: number;

    @Column({type: 'varchar', length: 500, nullable: true})
    twitter_id: number;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    apple_id: number;

    @Column({type: 'varchar', length: 500, nullable: true, select: false})
    vk_id: number;

    @Column({type: 'money', default: 0, select: false})
    balance: string;

    @Column('enum', {enum: Roles, default: Roles.User, select: false})
    role: Roles;

    @OneToMany(() => PostData, post => post.user, {cascade: true})
    posts?: PostData[];

    @OneToMany(() => Like, like => like.user, {cascade: true})
    likes?: Like[];

    @OneToMany(() => Like, like => like.user, {cascade: true})
    liked?: Like[];
}
