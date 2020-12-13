import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {LikeService} from "./like.service";
import {JwtAuthGuard} from "../auth/jwt/jwt-auth.guard";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {User} from "../decorators/user.decorator";
import {CreateLikeDto} from "./dto/create-like-dto";

@ApiTags('Like')

@Controller('like')

export class LikeController {
    constructor(private like: LikeService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/save')
    @ApiOperation({summary: 'Like'})
    makeLike(@Body() createLikeDto: CreateLikeDto, @User() user: any): Promise<void> {
        return this.like.makeLike(createLikeDto, user);
    }


    @UseGuards(JwtAuthGuard)
    @Post('/delete')
    @ApiOperation({summary: 'Delete Like'})
    deleteLike(@Body() createLikeDto: CreateLikeDto, @User() user: any): Promise<void> {
        return this.like.deleteLike(createLikeDto, user);
    }

    @Get('')
    getAll(): Promise<any> {
        return this.like.getAll()
    }
}
