import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Like} from "../database/entities/like.entity";
import {LikeService} from "./like.service";
import {LikeController} from "./like.controller";
import {PostData} from "../database/entities/post.entity";
import {User} from "../database/entities/user.entity";

@Module({
    providers: [LikeService],
    imports: [TypeOrmModule.forFeature([Like,PostData,User])],
    controllers: [LikeController]
})
export class LikeModule {
}
