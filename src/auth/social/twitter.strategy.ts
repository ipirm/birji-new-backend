import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-twitter';

import { Injectable } from '@nestjs/common';
import {UserService} from "../../user/user.service";

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
    constructor(private readonly userService: UserService) {
        super({
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: process.env.TWITTER_CALLBACK_URL,
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        console.log(profile)
        const user = await this.userService.findOrCreate(
            profile,
        );
        done(null, user);
    }
}