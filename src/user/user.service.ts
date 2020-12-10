import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {RegistrationDto} from "../auth/dto/registration-dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>
    ) {
    }

    async createUser(registrationDto: RegistrationDto): Promise<any> {
        const exist = await this.user.findOne({where: {email: registrationDto.email}})
        if (exist)
            throw new HttpException({
                status: HttpStatus.CONFLICT,
                error: 'This user exist',
            }, HttpStatus.CONFLICT);


        const user = this.user.create(registrationDto);
        return await this.user.save(user);
    }

    async findOrCreate(profile): Promise<any> {
        const {provider} = profile
        let user;
        if (provider === 'twitter') {
            user = await this.user.findOne({twitter_id: profile.id});
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

            const newUser = this.user.create(createdUser)
            user = await this.user.save(newUser)
        }
        return user

    }

    async getAll(): Promise<any> {
        return await this.user.find()
    }
}
