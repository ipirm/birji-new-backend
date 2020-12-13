import {Controller, Get, Query, Post, Body, Put, Param, Delete} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {Pagination} from "nestjs-typeorm-paginate";
import {User} from "../database/entities/user.entity";
import {RegistrationDto} from "../auth/dto/registration-dto";
import {UpdateUserDto} from "./dto/update-user-dto";
import {UpdateResult, DeleteResult} from 'typeorm';


@ApiTags('User')

@Controller('user')
export class UserController {
    constructor(private user: UserService) {
    }

    @Get('')
    @ApiOperation({summary: 'Get all users'})
    getAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 100
    ): Promise<Pagination<User>> {
        limit = limit > 100 ? 100 : limit;
        return this.user.getAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by id'})
    getUser(@Param('id') id: number): Promise<User> {
        return this.user.getUser(id)
    }

    @Post('')
    @ApiOperation({summary: 'Create users'})
    createUser(@Body() registrationDto: RegistrationDto): Promise<User> {
        return this.user.createUser(registrationDto)
    }

    @Put(':id')
    @ApiOperation({summary: 'Update users'})
    updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.user.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user'})
    deleteUser(@Param('id') id: number): Promise<DeleteResult> {
        return this.user.removeUser(id)
    }

}