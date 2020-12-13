import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {UpdateResult, DeleteResult} from 'typeorm';
import {Category} from "../database/entities/category.entity";
import {CreateCategoryDto} from "./dto/create-category-dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly category: Repository<Category>
    ) {
    }

    async getAll(page, limit): Promise<Pagination<Category>> {
        const data = await this.category.createQueryBuilder('category')
            .leftJoinAndSelect("category.posts", "posts")
            .orderBy('category.id', 'ASC')
        return await paginate(data, {page, limit})
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<any> {
        const category = await this.category.findOne({where: {title: createCategoryDto.title}})
        if (category) {
            return {
                status: HttpStatus.CONFLICT,
                message: 'Title is Exist'
            }
        }
        return await this.category.save(this.category.create(createCategoryDto))
    }

    async updateCategory(id, createCategoryDto: CreateCategoryDto): Promise<UpdateResult> {
        return await this.category.update(id, createCategoryDto)
    }

    async deleteCategory(id): Promise<DeleteResult> {
        return await this.category.delete(id)
    }

    async getCategory(id): Promise<Category> {
        return await this.category.findOne(id)
    }
}
