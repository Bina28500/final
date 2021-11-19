import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryController } from './repositories/repos.controller';
import { Repositories } from './repositories/repos.service';
import { CommitsController } from './commits/commits.controller';
import { Commits } from './commits/commits.service';

@Module({
  imports: [],
  controllers: [AppController, RepositoryController, CommitsController],
  providers: [AppService, Repositories, Commits]
})
export class AppModule {}
