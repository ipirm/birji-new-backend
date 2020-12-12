import {Controller, Get, Query, Post, Body, Param, Put, Delete} from '@nestjs/common';
import {PostService} from "./post.service";
import {Pagination} from "nestjs-typeorm-paginate";
import {PostData} from "../../database/entities/post.entity";
import {UpdateResult, DeleteResult} from 'typeorm';
import {CreatePostDto} from "./dto/create-post-dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {UpdatePostDto} from "./dto/update-post-dto";

@ApiTags('Post')

@Controller('post')
export class PostController {
    constructor(private post: PostService) {
    }

    @Get('')
    @ApiOperation({summary: 'Get all posts'})
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<Pagination<PostData>> {
        return this.post.getAll(page, limit)
    }

    @Get(':id')
    @ApiOperation({summary: 'Get post'})
    findPost(@Param('id') id: number): Promise<PostData> {
        return this.post.getPost(id)
    }


    @Post('')
    @ApiOperation({summary: 'Create post'})
    createPost(@Body() createPostDto: CreatePostDto): Promise<PostData> {
        return this.post.createPost(createPostDto)
    }

    @Put(':id')
    @ApiOperation({summary: 'Update post'})
    updatePost(
        @Param('id') id: number,
        @Body() updatePostDto: UpdatePostDto): Promise<UpdateResult> {
        return this.post.updatePost(id, updatePostDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete post'})
    deletePost(@Param('id') id: number): Promise<DeleteResult> {
        return this.post.deletePost(id)
    }


}
