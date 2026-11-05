
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

type TaskStatus = 'todo' | 'inProgress' | 'done';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  getTasks(projectId: string) {
    return this.prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        id: 'desc'
      },
    });
  }

  createTask(projectId: string, title: string) {
    return this.prisma.task.create({
      data: {
        title,
        project: {
          connect: { id: projectId },
        },
      },
    });
  }

  updateTask(id: number, status: TaskStatus) {
    return this.prisma.task.update({
      where: { id },
      data: { status },
    });
  }

  deleteTask(id: number) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
