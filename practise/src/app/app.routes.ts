import { Routes } from '@angular/router';
import { TodosComponent } from './MyComponents/todos/todos.component';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./MyComponents/todos/todos.component').then(m => m.TodosComponent)
  },
  {
    path: 'login',
    // pathMatch: 'full',
    loadComponent: () => import('./form/form.component').then(m => m.FormComponent)
  },
  {
    path:"user",
    loadComponent:()=> import('./table/table.component').then(m => m.TableComponent)  
  },
  {
    path:"updUser",
    loadComponent:()=> import('./updatetable/updatetable.component').then(m => m.UpdatetableComponent)  
  }
];
 