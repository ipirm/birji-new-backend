import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ormConfig} from "./orm.config";
import {ServeStaticModule} from "@nestjs/serve-static";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {AppService} from "./app.service";
import {AppController} from "./app.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        TypeOrmModule.forRoot(ormConfig),
        ServeStaticModule.forRoot({rootPath: `${process.cwd()}/public`}),
        AuthModule,
        UserModule
    ],
    providers: [AppService],
    controllers: [AppController]
})

export class AppModule {
}