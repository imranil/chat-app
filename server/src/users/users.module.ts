import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesModule } from 'src/roles/roles.module';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';

@Module({
  imports: [
    DatabaseModule,
    RolesModule,
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService,
    ...usersProviders,
  ],
  exports: [
    UsersService,
    ...usersProviders,
  ]
})
export class UsersModule {}
