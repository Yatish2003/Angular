import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router'
import { UpdatetableComponent } from "../updatetable/updatetable.component";
import id from '@angular/common/locales/id';
interface User {
  id: number;
  userName: string;
  email: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class TableComponent implements OnInit {

  selectedUserId: any;
  data: any = [];

  constructor(private user:PostService,private routes:Router) {}

  ngOnInit(): void {
    this.user.getUser()
        .subscribe(response => {
          this.data=response;
          // console.log(this.data);
        });

  }
  delete(id: any): void {
    let conId:string=String(id);
    this.user.deleteUser(conId).subscribe(
      response =>{
        this.data = this.data.filter((user: { id: any; }) => user.id !== id);
        
      }
    );
  }
  showUserData(id:any){
    // console.log(id,"id");
    this.user.getUserById(id)
    .subscribe(response => console.log(response));
    //  this.redirectUser();
    this.routes.navigate(['/updUser'], { queryParams: { id: id } });
  }

}
