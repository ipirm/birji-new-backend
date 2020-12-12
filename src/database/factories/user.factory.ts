import * as Faker from 'faker'
import {User} from '../entities/User.entity'
import {define} from "typeorm-seeding";


define(User, (faker: typeof Faker) => {
    const user = new User();
    user.name = faker.name.firstName();
    user.last_name = faker.name.lastName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.avatar = faker.internet.avatar();
    return user
})
