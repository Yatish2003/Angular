import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'

interface userData {
  userName: string;
  lastName: string;
  email: string;
  pass: string;
  Cpass: string;
}

@Component({
  selector: 'app-updatetable',
  imports: [FormsModule, CommonModule],
  templateUrl: './updatetable.component.html',
  styleUrls: ['./updatetable.component.css'],
})
export class UpdatetableComponent implements OnInit {

  userId: any;
  // updUser:any;
  updUser: any = {
    userName: '',
    lastName: '',
    email: '',
    pass: '',
    Cpass: '',
  };

  constructor(private user: PostService, private routes:Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['id']; 
      console.log('User ID:', this.userId);
      if (this.userId) {
      
        this.user.getUserById(this.userId).subscribe((response) => {
          this.updUser = response; 
          console.log('Fetched User Data:', response);
        });
      }
    });
  }

  
  validatePasswordMatch() {
    return this.updUser.pass === this.updUser.Cpass;
  }

  
  updVal(form: NgForm) {
    if (form.invalid || !this.validatePasswordMatch()) {
      console.log('Form is invalid or passwords do not match.');
      return;
    }

    // console.log('Updated User Data:', this.updUser);
    
    
    this.user.updateUser(this.userId, this.updUser)
    .subscribe(Response =>{
      console.log(Response);
    });
    this.routes.navigate(['/user']);

    
  }
}
