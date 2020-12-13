import {ApiProperty} from "@nestjs/swagger";
import {IsString} from 'class-validator';

export class CreateCategoryDto {

    @IsString()
    @ApiProperty({example: 'Мнения', description: 'title'})
    title: string;

    @IsString()
    @ApiProperty({example: 'Мнения', description: 'description'})
    description: string;

}
