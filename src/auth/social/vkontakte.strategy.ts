import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy, VerifyCallback} from "passport-vkontakte";
import {UserService} from "../../user/user.service";

@Injectable()
export class VkontakteStrategy extends PassportStrategy(Strategy, "vkontakte") {
    constructor(private readonly userService: UserService) {
        super({
            passReqToCallBack: false,
            clientID: process.env.VK_CLIENT_ID,
            clientSecret: process.env.VK_CLIENT_SECRET,
            callbackURL: process.env.VK_REDIRECT_URL,
            scope: ['id', 'displayName', 'name', 'gender', 'email', 'photos'],
            profileFields: ["email"]
        }, async (accessToken: any,
                  refreshToken: any,
                  params: any,
                  profile: any,
                  done: VerifyCallback) => {
            const user = await this.userService.findOrCreate(profile)
            done(null, user)
        });
    }
}