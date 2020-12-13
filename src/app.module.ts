import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as ormConfig from "./database/orm.config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {AppService} from "./app.service";
import {AppController} from "./app.controller";
import {PostModule} from './post/post.module';
import {LikeModule} from './like/like.module';
import {TagModule} from './tag/tag.module';
import {SearchModule} from './search/search.module';
import {CategoryModule} from './category/category.module';


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
        SearchModule,
        CategoryModule
    ],
    providers: [AppService],
    controllers: [AppController]
})

export class AppModule {
}