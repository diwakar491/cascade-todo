import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="card" style="max-width: 500px; margin: 0 auto;">
        <h2>{{ isEditMode ? 'Edit Todo' : 'New Todo' }}</h2>
        
        <div *ngIf="error" class="alert alert-error">
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
              rows="3"
              maxlength="500"
            ></textarea>
          </div>
          
          <div class="form-group">
            <label for="priority">Priority</label>
            <select
              id="priority"
              class="form-control"
              [(ngModel)]="todo.priority"
              name="priority"
              required
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          
          <div class="form-group" *ngIf="isEditMode">
            <label>
              <input
                type="checkbox"
                [(ngModel)]="todo.completed"
                name="completed"
              />
              Completed
            </label>
          </div>
          
          <div style="display: flex; gap: 12px;">
            <button type="submit" class="btn btn-primary" [disabled]="loading">
              {{ loading ? 'Saving...' : (isEditMode ? 'Update' : 'Create') }}
            </button>
            <a routerLink="/todos" class="btn btn-secondary">Cancel</a>
          </div>
        </form>
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
