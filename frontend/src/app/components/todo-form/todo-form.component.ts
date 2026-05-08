import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  styles: [`
    .container {
      min-height: 100vh;
      background: #f9fafb;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .todo-form-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      overflow: hidden;
      max-width: 500px;
      width: 100%;
    }

    .form-header {
      background: #4f46e5;
      padding: 1.5rem;
      text-align: center;
    }

    .form-header h2 {
      color: white;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
    }

    .form-body {
      padding: 1.5rem;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem 0.875rem;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.2s, box-shadow 0.2s;
      background: white;
    }

    .form-control:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .form-control::placeholder {
      color: #9ca3af;
    }

    textarea.form-control {
      resize: vertical;
      min-height: 80px;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .checkbox-group input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #4f46e5;
      cursor: pointer;
    }

    .checkbox-group label {
      margin: 0;
      cursor: pointer;
      font-weight: 400;
      color: #374151;
    }

    .form-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
    }

    .btn {
      padding: 0.625rem 1.25rem;
      border: 1px solid;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .btn-primary {
      background: #4f46e5;
      color: white;
      border-color: #4f46e5;
    }

    .btn-primary:hover:not(:disabled) {
      background: #4338ca;
      border-color: #4338ca;
      color: white;
    }

    .btn-primary:disabled {
      background: #9ca3af;
      border-color: #9ca3af;
      cursor: not-allowed;
      opacity: 0.6;
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

    .alert {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 0.75rem;
      border-radius: 6px;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
    }

    .loading-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 480px) {
      .container {
        padding: 1rem;
      }
      
      .form-body {
        padding: 1.25rem;
      }
      
      .form-header {
        padding: 1.25rem;
      }
      
      .form-header h2 {
        font-size: 1.125rem;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `],
  template: `
    <div class="container">
      <div class="todo-form-card">
        <div class="form-header">
          <h2>{{ isEditMode ? 'Edit Todo' : 'Create New Todo' }}</h2>
        </div>
        
        <div class="form-body">
          <div *ngIf="error" class="alert">
            {{ error }}
          </div>
          
          <form (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                id="title"
                class="form-control"
                [(ngModel)]="todo.title"
                name="title"
                placeholder="Enter todo title"
                required
                maxlength="100"
              />
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                class="form-control"
                [(ngModel)]="todo.description"
                name="description"
                placeholder="Add a description (optional)"
                rows="4"
                maxlength="500"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="priority">Priority Level</label>
              <select
                id="priority"
                class="form-control"
                [(ngModel)]="todo.priority"
                name="priority"
                required
              >
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
              </select>
            </div>
            
            <div class="form-group" *ngIf="isEditMode">
              <div class="checkbox-group">
                <input
                  type="checkbox"
                  [(ngModel)]="todo.completed"
                  name="completed"
                  id="completed"
                />
                <label for="completed">Mark as completed</label>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn-primary" [disabled]="loading">
                <span *ngIf="loading" class="loading-spinner"></span>
                {{ loading ? 'Saving...' : (isEditMode ? 'Update Todo' : 'Create Todo') }}
              </button>
              <a routerLink="/todos" class="btn-secondary">Cancel</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TodoFormComponent implements OnInit {
  todo: Todo = {
    title: '',
    description: '',
    completed: false,
    priority: 'MEDIUM'
  };
  isEditMode = false;
  todoId?: number;
  loading = false;
  error = '';

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.todoId) {
      this.isEditMode = true;
      this.loadTodo();
    }
  }

  loadTodo(): void {
    this.loading = true;
    this.todoService.getTodoById(this.todoId!).subscribe({
      next: (todo) => {
        this.todo = todo;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load todo';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (!this.todo.title) {
      this.error = 'Title is required';
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.isEditMode) {
      this.todoService.updateTodo(this.todoId!, this.todo).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: () => {
          this.error = 'Failed to update todo';
          this.loading = false;
        }
      });
    } else {
      this.todoService.createTodo(this.todo).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: () => {
          this.error = 'Failed to create todo';
          this.loading = false;
        }
      });
    }
  }
}
