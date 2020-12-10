import {Controller, Get, Body, UseGuards, HttpStatus, Request, Post, Res, Req} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt/jwt-auth.guard";
import {AuthService} from "./auth.service";
import {User} from "../decorators/user.decorator";
import {AuthGuard} from "@nestjs/passport";
import {RegistrationDto} from "./dto/registration-dto";
import {LoginDto} from "./dto/login-dto";
import {ApiTags} from "@nestjs/swagger";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private auth: AuthService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req, @User() user: any) {
        return this.auth.profile(user);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.auth.login(loginDto)
    }

    @Post('registration')
    signUp(@Body() registrationDto: RegistrationDto) {
        return this.auth.registration(registrationDto)
    }

    @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth(@Request() req) {
        return HttpStatus.OK;
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req, @Res() res) {
        const url = await this.auth.signIn(req.user);
        return res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }

    @Get("facebook")
    @UseGuards(AuthGuard("facebook"))
    facebookLogin() {
        return HttpStatus.OK;
    }

    @Get("facebook/redirect")
    @UseGuards(AuthGuard("facebook"))
    async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
        const url = await this.auth.signIn(req.user);
        return res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }

    @Get("vkontakte")
    @UseGuards(AuthGuard("vkontakte"))
    vkontakteLogin() {
        return HttpStatus.OK;
    }

    @Get("vkontakte/redirect")
    @UseGuards(AuthGuard("vkontakte"))
    async vkontakteLoginRedirect(@Req() req, @Res() res): Promise<any> {
        const url = await this.auth.signIn(req.user);
        res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }


    @Get("twitter")
    @UseGuards(AuthGuard("twitter"))
    twitterLogin() {
        return HttpStatus.OK;
    }

    @Get("twitter/redirect")
    @UseGuards(AuthGuard("twitter"))
    async twitterLoginRedirect(@Req() req, @Res() res): Promise<any> {
        console.log(req.user);
        const url = await this.auth.signIn(req.user);
        res.redirect(`${process.env.FRONT_URL}/?access_token=${url.access_token}`)
    }

}
