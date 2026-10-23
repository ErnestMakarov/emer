import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  getProjects() {
    return this.prisma.project.findMany();
  }

  getProjectById(id : string) {
    return this.prisma.project.findUnique({
      where: { id },
    });
  }
 
  createProject(project: {
    name: string;
    description?: string;
    status?: string;
  }) {
    return this.prisma.project.create({
      data: {
        name: project.name,
        description: project.description ?? '',
        status: project.status || 'todo',
      },
    });
  }
}