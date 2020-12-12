import {Entity, ManyToOne} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {User} from "./user.entity";
import {PostData} from "./post.entity";

@Entity('likes')

export class Like extends BaseEntity {

    @ManyToOne(() => PostData, post => post.likes)
    post: PostData;

    @ManyToOne(() => User, user => user.likes)
    user: User;
}