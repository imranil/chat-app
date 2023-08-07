import { Providers } from "src/utils/constants";
import { dataSource } from "./data-source";


export const databaseProviders = [
    {
        provide: Providers.DATA_SOURCE,
        useFactory: async () => {
            return dataSource;
        },
    }
];