import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2>My Todos</h2>
          <a routerLink="/todos/new" class="btn btn-primary">Add New Todo</a>
        </div>
        
        <div *ngIf="loading" class="text-center">Loading...</div>
        
        <div *ngIf="error" class="alert alert-error">
          {{ error }}
        </div>
        
        <div *ngIf="!loading && todos.length === 0" class="text-center">
          No todos yet. <a routerLink="/todos/new" class="link">Create your first todo</a>
        </div>
        
        <ul class="todo-list" *ngIf="!loading && todos.length > 0">
          <li 
            *ngFor="let todo of todos" 
            class="todo-item"
            [class.completed]="todo.completed"
          >
            <input 
              type="checkbox" 
              class="checkbox"
              [checked]="todo.completed"
              (change)="toggleTodo(todo.id!)"
            />
            <div class="todo-content">
              <div class="todo-title">{{ todo.title }}</div>
              <div class="todo-description" *ngIf="todo.description">{{ todo.description }}</div>
              <div class="todo-meta">
                <span 
                  class="priority-badge"
                  [class.priority-high]="todo.priority === 'HIGH'"
                  [class.priority-medium]="todo.priority === 'MEDIUM'"
                  [class.priority-low]="todo.priority === 'LOW'"
                >
                  {{ todo.priority }}
                </span>
              </div>
            </div>
            <div style="display: flex; gap: 8px;">
              <a 
                [routerLink]="['/todos/edit', todo.id]" 
                class="btn btn-secondary btn-small"
              >
                Edit
              </a>
              <button 
                (click)="deleteTodo(todo.id!)" 
                class="btn btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = true;
  error = '';

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todos';
        this.loading = false;
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id).subscribe({
      next: () => {
        this.loadTodos();
      },
      error: () => {
        this.error = 'Failed to update todo';
      }
    });
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.loadTodos();
        },
        error: () => {
          this.error = 'Failed to delete todo';
        }
      });
    }
  }
}
