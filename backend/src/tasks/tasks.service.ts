
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  getTasks() {
    return this.prisma.task.findMany();
  }

  updateTask(id: number, completed: boolean) {
    return this.prisma.task.update({
      where: { id },
      data: { completed },
    });
  }

  createTask(task: { title: string; completed: boolean }) {
    return this.prisma.task.create({
      data: {
        title: task.title,
        completed: task.completed,
      },
    });
  
  }
}
