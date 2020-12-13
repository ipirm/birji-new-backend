import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostData} from "../database/entities/post.entity";
import {Category} from "../database/entities/category.entity";
import {Tag} from "../database/entities/tag.entity";

@Module({
    providers: [PostService],
    imports: [TypeOrmModule.forFeature([PostData, Category,Tag])],
    controllers: [PostController]
})
export class PostModule {
}
