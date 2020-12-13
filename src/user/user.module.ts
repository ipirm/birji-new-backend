import {Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/entities/user.entity";
import {UserService} from "./user.service";

@Module({
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService]
})
export class UserModule {
}
