import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MinLength, MaxLength} from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @ApiProperty({example: 'Admin', description: 'name'})
    name: string;

    @IsString()
    @ApiProperty({example: 'Adminov', description: 'last_name'})
    last_name: string;

    @IsEmail()
    @ApiProperty({example: 'ilham.pirm@gmail.com', description: 'email'})
    email: string;

    @IsString()
    @MinLength(6, {
        message: 'Пароль слишком короткий',
    })
    @MaxLength(32, {
        message: 'Пароль слишком длинный',
    })
    @ApiProperty({example: 'hakernadir', description: 'password'})
    password: string;

}
