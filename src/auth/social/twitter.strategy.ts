import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-twitter-oauth2';

import {Injectable} from '@nestjs/common';
import {UserService} from "../../user/user.service";

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
    constructor(private readonly userService: UserService) {
        super({
            clientID: process.env.TWITTER_CONSUMER_KEY,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            includeEmail: true,
            profileFields: ['id', 'displayName', 'photos', 'email']
        }, async (accessToken: any,
                  refreshToken: any,
                  params: any,
                  profile: any) => {
            console.log(profile);
            await this.userService.findOrCreate(profile)
        })
    }
}
