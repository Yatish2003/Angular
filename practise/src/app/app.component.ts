import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TodosComponent } from './MyComponents/todos/todos.component';
import { TodoitemsComponent } from './MComponents/todoitems/todoitems.component';
import { HeaderComponent } from './header/header.component';
import { CounterComponent } from "./counter/counter.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormComponent } from "./form/form.component";
import { TableComponent } from './table/table.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, HeaderComponent]
})
export class AppComponent {
  title = 'practise';
  todos: any = [];

  constructor() {
    this.todos = [
      { id: 1, name: "yatish", role: "abc" },
      { id: 2, name: "yatish2", role: "abc" },
      { id: 3, name: "yatish3", role: "abc" }
    ];
  }
  onChildDataRec(data: any){
    console.log(data,"data")
  }
  getDataheader(data :any){
    console.log(data,"header");

  }
}
