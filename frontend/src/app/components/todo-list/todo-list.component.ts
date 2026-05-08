import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
      background: #f9fafb;
      min-height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .todo-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .todo-header h2 {
      color: #111827;
      font-size: 1.875rem;
      font-weight: 600;
      margin: 0;
    }

    .todo-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .btn-primary {
      background: #4f46e5;
      color: white;
      border: 1px solid #4f46e5;
      padding: 0.625rem 1.25rem;
      border-radius: 6px;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: background-color 0.2s;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .btn-primary:hover {
      background: #4338ca;
      border-color: #4338ca;
      color: white;
    }

    .btn-primary::before {
      content: '+';
      margin-right: 6px;
      font-size: 1rem;
    }

    .loading-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
      font-size: 0.875rem;
    }

    .loading-spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #e5e7eb;
      border-radius: 50%;
      border-top-color: #4f46e5;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .alert {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 0.875rem 1rem;
      border-radius: 6px;
      margin: 1rem;
      font-size: 0.875rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6b7280;
    }

    .empty-state h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: #374151;
    }

    .empty-state p {
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
    }

    .empty-state a {
      color: #4f46e5;
      text-decoration: none;
      font-weight: 500;
      padding: 0.625rem 1.25rem;
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      transition: background-color 0.2s;
      display: inline-block;
    }

    .empty-state a:hover {
      background: #e5e7eb;
    }

    .todo-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .todo-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-bottom: 1px solid #f3f4f6;
      transition: background-color 0.2s;
    }

    .todo-item:hover {
      background: #f9fafb;
    }

    .todo-item:last-child {
      border-bottom: none;
    }

    .todo-item.completed {
      opacity: 0.6;
    }

    .todo-item.completed .todo-title {
      text-decoration: line-through;
      color: #6b7280;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      margin-right: 0.75rem;
      cursor: pointer;
      accent-color: #4f46e5;
      margin-top: 2px;
    }

    .todo-content {
      flex: 1;
      margin-right: 0.75rem;
    }

    .todo-title {
      font-size: 0.9375rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.25rem;
    }

    .todo-description {
      color: #6b7280;
      font-size: 0.8125rem;
      margin-bottom: 0.5rem;
    }

    .todo-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .priority-badge {
      padding: 0.125rem 0.5rem;
      border-radius: 4px;
      font-size: 0.6875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.025em;
      border: 1px solid;
    }

    .priority-high {
      background: #fef2f2;
      color: #dc2626;
      border-color: #fecaca;
    }

    .priority-medium {
      background: #fef3c7;
      color: #d97706;
      border-color: #fde68a;
    }

    .priority-low {
      background: #f0fdf4;
      color: #059669;
      border-color: #bbf7d0;
    }

    .todo-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-secondary, .btn-danger {
      padding: 0.375rem 0.75rem;
      border: 1px solid;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }

    .btn-secondary {
      background: #f9fafb;
      color: #374151;
      border-color: #d1d5db;
    }

    .btn-secondary:hover {
      background: #f3f4f6;
      color: #374151;
    }

    .btn-danger {
      background: #fef2f2;
      color: #dc2626;
      border-color: #fecaca;
    }

    .btn-danger:hover {
      background: #fee2e2;
      color: #dc2626;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      
      .todo-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .todo-header h2 {
        font-size: 1.5rem;
      }
      
      .todo-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
      }
      
      .todo-content {
        margin-right: 0;
      }
      
      .todo-actions {
        width: 100%;
        justify-content: flex-end;
      }
    }
  `],
  template: `
    <div class="container">
      <div class="todo-header">
        <h2>My Todos</h2>
        <a routerLink="/todos/new" class="btn-primary">Add New Todo</a>
      </div>
      
      <div class="todo-card">
        <div *ngIf="loading" class="loading-state">
          <div class="loading-spinner"></div>
          Loading your todos...
        </div>
        
        <div *ngIf="error" class="alert">
          {{ error }}
        </div>
        
        <div *ngIf="!loading && todos.length === 0" class="empty-state">
          <h3>No todos yet</h3>
          <p>Start organizing your tasks by creating your first todo item</p>
          <a routerLink="/todos/new">Create Your First Todo</a>
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
            <div class="todo-actions">
              <a 
                [routerLink]="['/todos/edit', todo.id]" 
                class="btn-secondary"
              >
                Edit
              </a>
              <button 
                (click)="deleteTodo(todo.id!)" 
                class="btn-danger"
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
