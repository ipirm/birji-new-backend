import {Controller, Get} from '@nestjs/common';
import {UserService} from "./user.service";
import {ApiTags} from "@nestjs/swagger";


@ApiTags('User')
@Controller('user')
export class UserController {
     constructor(private user: UserService){

     }

    @Get("/users")
    getAll() {
        return this.user.getAll()
    }
}
