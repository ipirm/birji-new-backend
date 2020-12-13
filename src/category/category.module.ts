import {Module} from '@nestjs/common';
import {CategoryController} from './category.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryService} from "./category.service";
import {Category} from "../database/entities/category.entity";

@Module({
    providers: [CategoryService],
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController]
})
export class CategoryModule {
}
