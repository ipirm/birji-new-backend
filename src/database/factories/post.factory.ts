import * as Faker from 'faker'
import {PostFactoryType} from "../../types/post.factory.type";
import {factory} from "typeorm-seeding";
import {User} from "../entities/user.entity";


export class PostFactory {
    faker: any = Faker;
    posts: PostFactoryType[] = [];
    count: number = 1

    constructor(count: number) {
        this.count = count;
    }

    make() {
        for (let i = 0; i < this.count; i++) {
            this.posts.push({
                meta_title: this.faker.lorem.paragraph(1),
                meta_description: this.faker.lorem.paragraph(3),
                title: this.faker.lorem.paragraph(1),
                description: this.faker.lorem.paragraph(3),
                text: this.faker.lorem.text(15),
                meta_keywords: this.faker.lorem.words(20),
                userId: this.faker.random.number(110)
            })
        }
        return this.posts
    }
}
