import { Module } from '@nestjs/common';
import { GroupsModule } from 'src/groups/groups.module';
import { MessagingGateway } from './gateway';
import { gatewayProviders } from './gateway.providers';


@Module({
    imports: [
        GroupsModule,
    ],
    providers: [
        MessagingGateway,
        ...gatewayProviders,
    ],
    exports: [
        MessagingGateway,
        ...gatewayProviders,
    ],
})
export class GatewayModule {}
