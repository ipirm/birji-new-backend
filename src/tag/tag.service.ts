import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {UpdateResult, DeleteResult} from 'typeorm';
import {Tag} from "../database/entities/tag.entity";
import {CreateTagDto} from "./dto/create-tag-dto";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag) private readonly tag: Repository<Tag>
    ) {
    }

    async createTag(createTagDto: CreateTagDto): Promise<any> {
        const tag = await this.tag.findOne({where: {title: createTagDto.title}})

        if (tag) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'Title is Exist'
            }
        }

        return await this.tag.save(this.tag.create(createTagDto))
    }

    async getAll(page, limit): Promise<Pagination<Tag>> {
        const data = await this.tag.createQueryBuilder('tag')
            .orderBy('tag.id', 'ASC');

        return await paginate(data, {page, limit})
    }

    async updateTag(id, createTagDto: CreateTagDto): Promise<UpdateResult> {
        return await this.tag.update(id, createTagDto)
    }

    async deleteTag(id): Promise<DeleteResult> {
        return await this.tag.delete(id)
    }

    async getTag(id): Promise<Tag> {
        return await this.tag.findOne(id)
    }
}
