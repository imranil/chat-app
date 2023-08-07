import { UserEntity } from "src/database/entities";
import { Providers } from "src/utils/constants";
import { DataSource } from "typeorm";


export const usersProviders = [
    {
        provide: Providers.USER_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
        inject: [Providers.DATA_SOURCE],
    },
];