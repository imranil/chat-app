import { RoleEntity } from "src/database/entities";
import { Providers } from "src/utils/constants";
import { DataSource } from "typeorm";


export const rolesProviders = [
    {
        provide: Providers.ROLE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(RoleEntity),
        inject: [Providers.DATA_SOURCE],
    },
];