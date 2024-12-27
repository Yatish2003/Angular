import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { TodosComponent } from '../../MyComponents/todos/todos.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-todoitems',
  imports: [CommonModule],
  templateUrl: './todoitems.component.html',
  styleUrl: './todoitems.component.css'
})
export class TodoitemsComponent {
  @Input() todos:any;
  @Output() childTod= new EventEmitter ();

  senddataToPArent(){
    this.childTod.emit("Data from child");
  }
}
