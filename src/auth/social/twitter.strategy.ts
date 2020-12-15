import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-twitter';

import {Injectable} from '@nestjs/common';
import {UserService} from "../../user/user.service";

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
    constructor(private readonly userService: UserService) {
        super({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            scope: ["email"],
            profileFields: ['id', 'displayName', 'name','emails','email']
        }, async (token, tokenSecret, profile) => {
             await this.userService.findOrCreate(profile)
        })
    }
}
