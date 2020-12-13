import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {CategoryService} from "./category.service";
import {Pagination} from "nestjs-typeorm-paginate";
import {DeleteResult, UpdateResult} from "typeorm";
import {Category} from "../database/entities/category.entity";
import {CreateCategoryDto} from "./dto/create-category-dto";

@ApiTags('Category')

@Controller('cat')
export class CategoryController {
    constructor(private category: CategoryService) {
    }

    @Get('')
    @ApiOperation({summary: 'Get all categories'})
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<Pagination<Category>> {
        return this.category.getAll(page, limit)
    }

    @Get(':id')
    @ApiOperation({summary: 'Get category'})
    getCategory(@Param('id') id: number): Promise<Category> {
        return this.category.getCategory(id)
    }


    @Post('')
    @ApiOperation({summary: 'Create category'})
    createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.category.createCategory(createCategoryDto)
    }

    @Put(':id')
    @ApiOperation({summary: 'Update category'})
    updateCategory(
        @Param('id') id: number,
        @Body() createCategoryDto: CreateCategoryDto): Promise<UpdateResult> {
        return this.category.updateCategory(id, createCategoryDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete category'})
    deleteCategory(@Param('id') id: number): Promise<DeleteResult> {
        return this.category.deleteCategory(id)
    }


}