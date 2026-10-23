import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    const project = await this.projectsService.getProjectById(id);

    if(!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
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