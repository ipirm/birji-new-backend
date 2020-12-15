import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import {UserService} from "../../user/user.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            callbackURL: process.env.FB_REDIRECT_URL,
            scope: ["email"],
            profileFields: ['id', 'displayName', 'name', 'gender','emails', 'picture.type(large)']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any, info?: any) => void): Promise<any> {
        const user = await this.userService.findOrCreate(
            profile,
        )
        done(null, user);
    }
}