import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as ormConfig from "./database/orm.config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthModule} from "./module/auth/auth.module";
import {UserModule} from "./module/user/user.module";
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import {PostModule} from './module/post/post.module';
import {LikeController} from './module/like/like.controller';
import {LikeService} from './module/like/like.service';
import {LikeModule} from './module/like/like.module';
import {TagModule} from './module/tag/tag.module';
import {SearchController} from './module/search/search.controller';
import {SearchService} from './module/search/search.service';
import {SearchModule} from './module/search/search.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        TypeOrmModule.forRoot(ormConfig),
        ServeStaticModule.forRoot({rootPath: `${process.cwd()}/public`}),
        AuthModule,
        UserModule,
        PostModule,
        LikeModule,
        TagModule,
        SearchModule
    ],
    providers: [AppService, LikeService, SearchService],
    controllers: [AppController, LikeController, SearchController]
})

export class AppModule {
}