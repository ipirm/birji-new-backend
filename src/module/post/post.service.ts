import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PostData} from "../../database/entities/post.entity";
import {Repository} from "typeorm";
import {CreatePostDto} from "./dto/create-post-dto";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {UpdatePostDto} from "./dto/update-post-dto";
import {UpdateResult, DeleteResult} from 'typeorm';


@Injectable()
export class PostService {
    constructor(@InjectRepository(PostData) private readonly post: Repository<PostData>) {
    }

    async createPost(createPostDto: CreatePostDto): Promise<PostData> {
        const post = this.post.create(createPostDto)
        return await this.post.save(post)
    }

    async getAll(page, limit): Promise<Pagination<PostData>> {
        return await paginate(this.post, {page, limit})
    }

    async updatePost(id, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
        return await this.post.update(id, updatePostDto)
    }

    async deletePost(id): Promise<DeleteResult> {
        return await this.post.delete(id)
    }

    async getPost(id):Promise<PostData>{
        return await this.post.findOne(id)
    }
}
