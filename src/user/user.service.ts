import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../database/entities/user.entity";
import {Repository} from "typeorm";
import {RegistrationDto} from "../auth/dto/registration-dto";
import {UpdateUserDto} from "./dto/update-user-dto";
import {paginate, Pagination} from "nestjs-typeorm-paginate";
import {UpdateResult, DeleteResult} from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly user: Repository<User>
    ) {
    }

    async createUser(registrationDto: RegistrationDto): Promise<User> {
        const exist = await this.user.findOne({where: {email: registrationDto.email}})
        if (exist)
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'This user exist',
            }, HttpStatus.CONFLICT);

        return await this.user.save(this.user.create(registrationDto));
    }

    async findOrCreate(profile): Promise<User> {
        const {provider} = profile
        let user;
        if (provider === 'twitter') {
            user = await this.user.findOne({twitter_id: parseInt(profile.id)});
        }
        if (provider === 'google') {
            user = await this.user.findOne({google_id: profile.id});
        }
        if (provider === 'facebook') {
            user = await this.user.findOne({facebook_id: profile.id})
        }
        if (provider === 'vkontakte') {
            user = await this.user.findOne({vk_id: profile.id})
        }

        if (!user) {
            const createdUser = {
                name: profile.name ? profile.name.givenName : '',
                last_name: profile.name ? profile.name.familyName : '',
                email: profile.emails ? profile.emails[0].value : '',
                password: '',
                gender: profile.gender ? profile.gender : '',
                avatar: profile.photos ? profile.photos[0].value : ''
            };
            if (provider === 'google') {
                Object.assign(createdUser, {google_id: profile.id})
            }
            if (provider === 'facebook') {
                Object.assign(createdUser, {facebook_id: profile.id})
            }
            if (provider === 'vkontakte') {
                Object.assign(createdUser, {vk_id: profile.id})
            }
            if (provider === 'twitter') {
                createdUser.name = profile.displayName;
                Object.assign(createdUser, {twitter_id: parseInt(profile.id)})
            }

            user = await this.user.save(this.user.create(createdUser))
        }
        return user

    }

    async getAll(page, limit): Promise<Pagination<User>> {
        return await paginate(this.user, {page, limit})
    }

    async updateUser(id, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        const exist = await this.user.findOne({where: {email: updateUserDto.email}})
        if (exist)
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'This user exist',
            }, HttpStatus.CONFLICT);
        return await this.user.update(id, updateUserDto)

    }

    async removeUser(id): Promise<DeleteResult> {
        const exist = await this.user.findOne(id)
        if (!exist)
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'This user doesnt exist',
            }, HttpStatus.CONFLICT);

        return await this.user.delete(id)
    }

    async getUser(id): Promise<User> {
        return await this.user.findOne(id)
    }

}
