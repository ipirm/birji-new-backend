import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class RegistrationDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Admin', description: 'name'})
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Adminov', description: 'last_name'})
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({example: 'ilham.pirm@gmail.com', description: 'email'})
    email: string;

    @IsNotEmpty()
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
