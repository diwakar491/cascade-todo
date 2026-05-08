import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'todos/new', component: TodoFormComponent, canActivate: [AuthGuard] },
  { path: 'todos/edit/:id', component: TodoFormComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/todos' }
];
