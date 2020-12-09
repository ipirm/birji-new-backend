import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsersEntity} from "../entities/user.entity";
import {UserService} from "./user.service";

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UserService]
})
export class UserModule {
}
