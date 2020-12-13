import {Module} from '@nestjs/common';
import {TagService} from './tag.service';
import {TagController} from './tag.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tag} from "../database/entities/tag.entity";

@Module({
    providers: [TagService],
    imports: [TypeOrmModule.forFeature([Tag])],
    controllers: [TagController]
})
export class TagModule {
}
