import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('projects/:projectId/tasks')
  getTasks(@Param('projectId') projectId: string) {
    return this.tasksService.getTasks(projectId);
  }

  @Post('projects/:projectId/tasks')
  createTask(
    @Param('projectId') projectId: string,
    @Body() body: { title: string },
  ) {
    return this.tasksService.createTask(projectId, body.title);
  }

  @Patch('tasks/:id')
  updateTask(
    @Param('id') id: string,
    @Body() body: { status: 'todo' | 'inProgress' | 'done' },
  ) {
    return this.tasksService.updateTask(Number(id), body.status);
  }

  @Delete('tasks/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }
}
