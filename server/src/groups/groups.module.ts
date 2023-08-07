import { Module } from '@nestjs/common';
import { groupsProviders } from './groups.providers';
import { GroupsService } from './services/groups.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { GroupsController } from './controllers/groups.controller';
import { GroupMessagesService } from './services/group-messages.service';
import { GroupMessagesController } from './controllers/group-messages.controller';

@Module({
    imports: [
        DatabaseModule,
        UsersModule,
    ],
    controllers: [
        GroupsController,
        GroupMessagesController,
    ],
    providers: [
        GroupsService,
        GroupMessagesService,
        ...groupsProviders
    ],
    exports: [
        GroupsService,
        GroupMessagesService,
    ],
})
export class GroupsModule {}
