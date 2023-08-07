import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { DatabaseModule } from 'src/database/database.module';
import { rolesProviders } from './roles.providers';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    RolesController
  ],
  providers: [
    RolesService,
    ...rolesProviders,
  ],
  exports: [
    RolesService,
    ...rolesProviders,
  ]
})
export class RolesModule {}
