import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [
      { id: 1, title: 'learn NestJS', completed: false },
      { id: 2, title: 'Connect to PostgreSQL', completed: true }
    ];

    getTasks() {
      return this.tasks;
    }

    createTask(task: {title: string, completed: boolean }) {
      const maxId = this.tasks.length 
      ? Math.max(...this.tasks.map(task => task.id))
      : 0;

      const newTask = {
        id: maxId + 1,
        title: task.title,
        completed: task.completed
      };

      this.tasks.push(newTask);

      return newTask;
    }
}
