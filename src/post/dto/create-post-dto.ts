import {IsBoolean, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreatePostDto {

    @IsString()
    @ApiProperty({example: 'Lorem Inpsum', description: 'meta_title'})
    meta_title: string;

    @IsString()
    @ApiProperty({example: 'Lorem Inpsum description', description: 'meta_description'})
    meta_description: string;

    @IsString()
    @ApiProperty({example: 'lorem,inpsum,description', description: 'meta_keywords'})
    meta_keywords: string;

    @IsNotEmpty({message: 'Title cannot be empty'})
    @IsString()
    @ApiProperty({example: 'Title of Post', description: 'title'})
    title: string;

    @IsNotEmpty({message: 'Description cannot be empty'})
    @IsString()
    @ApiProperty({example: 'Description of Post', description: 'description'})
    description: string;

    @IsNotEmpty({message: 'Text cannot be empty'})
    @IsString()
    @ApiProperty({example: 'Some text about post', description: 'text'})
    text: string;

    @IsString()
    @ApiProperty({example: '1', description: 'categoryId'})
    categoryId: string;

    @IsString()
    @ApiProperty({example: '1', description: 'tagId'})
    tagId: string;

    @IsBoolean()
    @ApiProperty({example: 'true', description: 'Draft or Publish'})
    draft: boolean
}