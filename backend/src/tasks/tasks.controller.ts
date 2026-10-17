import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }
  @Post()
    @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ) {
    return this.tasksService.updateTask(Number(id), body.completed);
  }
  createTask(@Body() body: { title: string, completed: boolean }) {
    return this.tasksService.createTask(body);
  }
}
