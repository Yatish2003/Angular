import { Component,signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  count=signal(0);

  addCount():void{
    this.count.update(val=>val+1);
    // this.count+=1;
  }
  subCount(){
    if(this.count()>0){
      this.count.update(val=>val-1);

    }
  }
}
