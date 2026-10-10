import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
      getTasks() {
        return [
            { id: 1, title: 'learn NestJS', completed: false },
            { id: 2, title: 'Connect to PostgreSQL', completed: true }
        ];
      }
    
}
