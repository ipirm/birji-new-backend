import {Controller, Get, Query, Post, Body, Param, Put, Delete, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {Pagination} from "nestjs-typeorm-paginate";
import {PostData} from "../database/entities/post.entity";
import {UpdateResult, DeleteResult} from 'typeorm';
import {CreatePostDto} from "./dto/create-post-dto";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {UpdatePostDto} from "./dto/update-post-dto";
import {User} from "../decorators/user.decorator";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";

@ApiTags('Post')

@Controller('post')
export class PostController {
    constructor(private post: PostService) {
    }

    @Get('')
    @ApiOperation({summary: 'Get all posts'})
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 100,
        @Query('cat') cat: string,
        @Query('tag') tag: string,
        @Query('author') author: string
    ): Promise<Pagination<PostData>> {
        return this.post.getAll(page, limit, cat, tag, author)
    }

    @Get(':slug')
    @ApiOperation({summary: 'Get post'})
    findPost(@Param('slug') slug: string): Promise<PostData> {
        return this.post.getPost(slug)
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    @ApiOperation({summary: 'Create post'})
    createPost(@Body() createPostDto: CreatePostDto, @User() user: any): Promise<PostData> {
        return this.post.createPost(createPostDto, user)
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
