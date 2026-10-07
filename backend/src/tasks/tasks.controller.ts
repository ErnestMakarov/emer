import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks() {
    return [
      { id: 1,
        title: 'learn NestJS',
        completed: false,
    },
      { id: 2,
        title: 'Connect to PostgreSQL',
        completed: true,
    },
    ];
  }
  @Post()
  createTask(@Body() body: any) {
    return body
  }
}
