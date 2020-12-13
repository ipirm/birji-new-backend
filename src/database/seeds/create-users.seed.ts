import {Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {UserFactory} from '../factories/user.factory'
import {UserFactoryType} from "../../types/user.factory.type";

export default class CreateUsers implements Seeder {
    users: UserFactoryType[] = [];

    public async run(factory: Factory, connection: Connection): Promise<void> {
        this.users = new UserFactory(0).make()
        await connection
            .createQueryBuilder()
            .insert()
            .into('user')
            .values(this.users)
            .execute()
    }
}
