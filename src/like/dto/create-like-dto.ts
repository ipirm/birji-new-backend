import {ApiProperty} from "@nestjs/swagger";
import {IsString} from 'class-validator';

export class CreateLikeDto {

    @IsString()
    @ApiProperty({example: '1', description: 'likedId'})
    likedId: string;


    @IsString()
    @ApiProperty({example: '1', description: 'postId'})
    postId: string;
}
