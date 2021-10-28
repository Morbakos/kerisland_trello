import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'trello',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: ["error", "migration", "schema", "warn", "log"],
    autoLoadEntities: true
};

export default config;

