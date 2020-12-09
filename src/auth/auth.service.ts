import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {UsersEntity} from "../entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {RegistrationDto} from "./dto/registration-dto";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login-dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        @InjectRepository(UsersEntity) private readonly user: Repository<UsersEntity>
    ) {
    }

    async signIn(user: any) {
        const payload = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: LoginDto): Promise<any> {
        const user = await this.user.createQueryBuilder('user')
            .where("user.email = :email", {email: loginDto.email})
            .addSelect(['user.password'])
            .getOne();

        if (!user)
            throw new UnauthorizedException('Cannot user with this email');


        const valid = await bcrypt.compare(loginDto.password, user.password);

        if (!valid)
            throw new UnauthorizedException('Wrong Password');


        return {
            access_token: this.jwtService.sign({...user})
        }
    }


    async profile(user: any): Promise<any> {
        return await this.user
            .createQueryBuilder('user')
            .where("user.id = :id", {id: user.id})
            .addSelect(["user.balance"])
            .getOne();
    }

    async registration(registrationDto: RegistrationDto): Promise<any> {
        return this.userService.createUser(registrationDto);
    }
}
