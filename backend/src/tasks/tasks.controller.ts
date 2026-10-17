import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
getTasks() {
  return this.tasksService.getTasks();
}

  @Post()
  createTask(@Body() body: { title: string; completed: boolean }) {
    return this.tasksService.createTask(body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(Number(id));
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() body: { completed: boolean },
  ) {
    return this.tasksService.updateTask(Number(id), body.completed);
  }
}
