import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostData} from "../../database/entities/post.entity";

@Module({
    providers: [PostService],
    imports: [TypeOrmModule.forFeature([PostData])],

    controllers: [PostController]
})
export class PostModule {
}
