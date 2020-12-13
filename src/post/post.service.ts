import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PostData} from "../database/entities/post.entity";
import {Repository} from "typeorm";
import {CreatePostDto} from "./dto/create-post-dto";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {UpdatePostDto} from "./dto/update-post-dto";
import {UpdateResult, DeleteResult} from 'typeorm';
import {Category} from "../database/entities/category.entity";
import {Tag} from "../database/entities/tag.entity";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostData) private readonly post: Repository<PostData>,
        @InjectRepository(Category) private readonly category: Repository<Category>,
        @InjectRepository(Tag) private readonly tag: Repository<Tag>
    ) {
    }

    async createPost(createPostDto: CreatePostDto, user): Promise<any> {
        const post = await this.post.findOne({where: {title: createPostDto.title}})

        if (post) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'Title is Exist'
            }
        }

        const category = await this.category.findOne(createPostDto.categoryId);
        const tag = await this.tag.findOne(createPostDto.tagId);
        Object.assign(createPostDto, {tags: [tag]});
        return await this.post.save(this.post.create({...createPostDto, user: user, category: category}))
    }

    async getAll(page, limit, cat, tag, author): Promise<Pagination<PostData>> {
        const data = await this.post.createQueryBuilder('post')
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.category", "category")
            .leftJoinAndSelect("post.tags", "tags")
            .leftJoinAndSelect("post.likes", "likes")
            .orderBy('post.id', 'ASC');

        if (cat)
            data.where("category.id = :catId", {catId: cat});

        if (tag)
            data.andWhere("tags.id = :tagId", {tagId: tag});

        if (author)
            data.andWhere("user.id = :userId", {userId: author});


        return await paginate(data, {page, limit});
    }

    async updatePost(id, updatePostDto: UpdatePostDto): Promise<UpdateResult> {
        return await this.post.update(id, updatePostDto)
    }

    async deletePost(id): Promise<DeleteResult> {
        return await this.post.delete(id)
    }

    async getPost(slug): Promise<PostData> {
        return await this.post.findOne({where: {slug: slug}, relations: ['user', 'category', 'tags']})
    }
}
