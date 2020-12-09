import {Controller, Get, HttpStatus} from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
     constructor(private user: UserService){

     }

    @Get("/users")
    getAll() {
        return this.user.getAll()
    }
}
