import { GroupEntity, GroupMessageEntity } from "src/database/entities";
import { Providers } from "src/utils/constants";
import { DataSource } from "typeorm";


export const groupsProviders = [
    {
        provide: Providers.GROUP_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(GroupEntity),
        inject: [Providers.DATA_SOURCE],
    },
    {
        provide: Providers.GROUP_MESSAGE_REPOSITORY,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(GroupMessageEntity),
        inject: [Providers.DATA_SOURCE],
    },
];