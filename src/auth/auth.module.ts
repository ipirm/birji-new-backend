import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../database/entities/user.entity";
import {jwtConstants} from "./jwt/constants";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {UserService} from "../user/user.service";
import {VkontakteStrategy} from "./social/vkontakte.strategy";
import {GoogleStrategy} from "./social/google.strategy";
import {FacebookStrategy} from "./social/facebook.strategy";
import {TwitterStrategy} from "./social/twitter.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '286400s'},
        }),
        TypeOrmModule.forFeature([User])],
    providers: [AuthService, JwtStrategy, UserService,VkontakteStrategy,GoogleStrategy,FacebookStrategy,TwitterStrategy],
    controllers: [AuthController]
})
export class AuthModule {
}
