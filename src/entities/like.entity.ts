import {Entity, ManyToOne} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {UsersEntity} from "./user.entity";
import {PostEntity} from "./post.entity";

@Entity('likes')

export abstract class LikeEntity extends BaseEntity {

    @ManyToOne(() => PostEntity, post => post.likes)
    post: PostEntity;

    @ManyToOne(() => UsersEntity, user => user.likes)
    user: UsersEntity;
}