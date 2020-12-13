import {ApiProperty} from "@nestjs/swagger";
import {IsString} from 'class-validator';

export class CreateTagDto {

    @IsString()
    @ApiProperty({example: 'Нефть и Газ', description: 'title'})
    title: string;
}
