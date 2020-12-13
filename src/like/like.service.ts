import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Like} from "../database/entities/like.entity";
import {CreateLikeDto} from "./dto/create-like-dto";
import {PostData} from "../database/entities/post.entity";
import {User} from "../database/entities/user.entity";

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like) private readonly like: Repository<Like>,
        @InjectRepository(PostData) private readonly post: Repository<PostData>,
        @InjectRepository(User) private readonly user: Repository<User>
    ) {
    }


    async makeLike(createLikeDto: CreateLikeDto, user): Promise<any> {
        const post = await this.post.createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .where("post.id = :id", {id: createLikeDto.postId})
            .getOne();

        const likedUser = await this.user.findOne(createLikeDto.likedId);

        const exist = await this.like.findOne({
            where: {
                userId: createLikeDto.likedId,
                postId: createLikeDto.postId,
                likedId: user.id
            }
        })
        if (exist) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'Exist'
            }
        }
        await this.post.update(post.id, {likeCount: ++post.likeCount});
        await this.user.update(createLikeDto.likedId, {likeCount: ++likedUser.likeCount});

        return await this.like.save(
            this.like.create({userId: createLikeDto.likedId, postId: `${post.id}`, likedId: `${user.id}`}
            ))
    }

    async deleteLike(createLikeDto: CreateLikeDto, user): Promise<any> {
        const post = await this.post.createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .where("post.id = :id", {id: createLikeDto.postId})
            .getOne();

        const likedUser = await this.user.findOne(createLikeDto.likedId);

        const exist = await this.like.findOne({
            where: {
                userId: createLikeDto.likedId,
                postId: createLikeDto.postId,
                likedId: user.id
            }
        })
        if (!exist) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'Not Exist'
            }
        }

        await this.post.update(post.id, {likeCount: --post.likeCount});
        await this.user.update(createLikeDto.likedId, {likeCount: --likedUser.likeCount});

        return await this.like.delete({userId: createLikeDto.likedId, postId: `${post.id}`, likedId: `${user.id}`})
    }

    async getAll(): Promise<any> {
        return await this.like.find({relations: ['user','liked','post']})

    }
}
