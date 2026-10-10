import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }
  @Post()
  createTask(@Body() body: any) {
    return body
  }
}
