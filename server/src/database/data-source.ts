import { DataSource, DataSourceOptions } from "typeorm";



const connection = () => {
    const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USERNAME || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'root',
        database: process.env.DATABASE_NAME || 'chat',
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
    } as DataSourceOptions);

    dataSource.initialize();
    return dataSource;
};

export const dataSource = connection();