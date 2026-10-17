import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Post()
  createProject(
    @Body() body: {
      name: string;
      description?: string;
      status?: string;
    },
  ) {
    return this.projectsService.createProject(body);
  }
}