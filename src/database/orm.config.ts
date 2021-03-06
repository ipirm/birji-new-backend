const config: any = {

    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: "root",
    database: "birji_db",
    entities: ["dist/database/**/*.entity.js"],
    factories: ["dist/database/factories/**/*.js"],
    seeds: ["dist/database/seeds/**/*.js"],
    migrations: ["dist/migration/*.js"],
    migrationsRun: true,
    synchronize: true,
    logging: ['error'],
    cli: {
        migrationsDir: 'src/database/migrations',
    }

    //
    // type: 'postgres',
    // host: 'ec2-3-218-123-191.compute-1.amazonaws.com',
    // url: 'postgres://cdiimlezylnkrx:44c74b5ef1d1c49a866f3a40cabdceb802042de251cb9375c0fe8c9bec77c5ba@ec2-3-218-123-191.compute-1.amazonaws.com:5432/d7dfem11uggn5m',
    // port: 5432,
    // username: 'cdiimlezylnkrx',
    // password: '44c74b5ef1d1c49a866f3a40cabdceb802042de251cb9375c0fe8c9bec77c5ba',
    // database: 'd7dfem11uggn5m',
    // entities: ['dist/**/*.entity.js'],
    // migrations: ["dist/migrations/*{.ts,.js}"],
    // migrationsTableName: "migrations_typeorm",
    // migrationsRun: true,
    // synchronize: true,
    // logging: true,
    // cli: {
    //     migrationsDir: "migrations"
    // }
}

export = config;