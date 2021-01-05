import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    const options = new DocumentBuilder()
        .setDescription('The  API description')
        .setVersion('1.0')
        .build();
    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, options);
    app.use(
        session({
            secret: 'birjiRfSecret',
            resave: false,
            saveUninitialized: false,
        }),
        
    );
    app.enableCors();
    SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT || 3000);
}


bootstrap();
