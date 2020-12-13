import {JoinColumn, Column, Entity, ManyToOne} from 'typeorm'
import {BaseEntity} from "./base.entity";
import {User} from "./user.entity";
import {PostData} from "./post.entity";

@Entity('likes')

export class Like extends BaseEntity {

    @ManyToOne(() => PostData, post => post.likes, {primary: true})
    @JoinColumn({name: 'postId'})
    post: PostData;

    @ManyToOne(() => User, user => user.likes, {primary: true})
    @JoinColumn({name: 'userId'})
    user: User;

    @ManyToOne(() => User, user => user.liked, {primary: true})
    @JoinColumn({name: 'likedId'})
    liked: User;

    @Column()
    public userId: string;

    @Column()
    public postId: string;

    @Column()
    public likedId: string;


}