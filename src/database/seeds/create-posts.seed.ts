import {Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {PostFactoryType} from "../../types/post.factory.type";
import {PostFactory} from "../factories/post.factory";

export default class CreatePosts implements Seeder {
    posts: PostFactoryType[] = [];

    public async run(factory: Factory, connection: Connection): Promise<void> {
        this.posts = new PostFactory(50).make()
        await connection
            .createQueryBuilder()
            .insert()
            .into('posts')
            .values(this.posts)
            .execute()
     }
}
