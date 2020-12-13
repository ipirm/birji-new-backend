import {Controller, Get, Query, Post, Body, Param, Put, Delete} from '@nestjs/common';
import {Pagination} from "nestjs-typeorm-paginate";
import {UpdateResult, DeleteResult} from 'typeorm';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {TagService} from "./tag.service";
import {Tag} from "../database/entities/tag.entity";
import {CreateTagDto} from "./dto/create-tag-dto";

@ApiTags('Tag')

@Controller('tag')
export class TagController {
    constructor(private tag: TagService) {
    }

    @Get('')
    @ApiOperation({summary: 'Get all tags'})
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 100,
        @Query('cat') cat: string
    ): Promise<Pagination<Tag>> {
        return this.tag.getAll(page, limit)
    }

    @Get(':id')
    @ApiOperation({summary: 'Get tag'})
    findPost(@Param('id') id: number): Promise<Tag> {
        return this.tag.getTag(id)
    }

    @Post('')
    @ApiOperation({summary: 'Create tag'})
    createPost(@Body() createTagDto: CreateTagDto): Promise<Tag> {
        return this.tag.createTag(createTagDto)
    }

    @Put(':id')
    @ApiOperation({summary: 'Update tag'})
    updatePost(
        @Param('id') id: number,
        @Body() createTagDto: CreateTagDto): Promise<UpdateResult> {
        return this.tag.updateTag(id, createTagDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete tag'})
    deletePost(@Param('id') id: number): Promise<DeleteResult> {
        return this.tag.deleteTag(id)
    }

}
