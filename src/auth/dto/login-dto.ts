import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, IsNotEmpty} from 'class-validator';

export class LoginDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: 'Admin', description: 'name'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Adminov', description: 'last_name'})
    password: string;

}
