
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TasksModule } from './tasks/tasks.module.js';
import { ProjectsModule } from './projects/projects.module.js';

@Module({
  imports: [TasksModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
