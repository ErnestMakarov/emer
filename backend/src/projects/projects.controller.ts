import { Controller, Get, Post, Body, Param, NotFoundException, Delete } from '@nestjs/common';
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
    },
  ) {
    return this.projectsService.createProject(body);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    const result = await this.projectsService.deleteProject(id);

    if (result.count === 0) {
      throw new NotFoundException('Project not found');
    }

    return { deleted: true };
  }
}
