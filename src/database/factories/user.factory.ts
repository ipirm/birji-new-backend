import * as Faker from 'faker'
import {UserFactoryType} from "../../types/user.factory.type";


export class UserFactory {
    faker: any = Faker;
    users: UserFactoryType[] = [];
    count: number = 1

    constructor(count: number) {
        this.count = count;
    }

    make() {
        for (let i = 0; i < this.count; i++) {
            this.users.push({
                name: this.faker.name.firstName(),
                last_name: this.faker.name.lastName(),
                email: this.faker.internet.email(),
                password: this.faker.internet.password(),
                avatar: this.faker.internet.avatar()
            })
        }
        return this.users
    }
}
