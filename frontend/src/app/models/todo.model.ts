export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt?: string;
}
