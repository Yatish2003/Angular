import { CommonModule } from '@angular/common';
import { Component, OnInit,Injectable } from '@angular/core';
import { FormBuilder, FormsModule,FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
interface data{
  userName:string,
  lastName:string,
  email:string,
  pass:string,
  Cpass:string
}

@Component({
  selector: 'app-form',
  imports: [FormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',

})

export class FormComponent implements OnInit {
  http: any;
  
  constructor(private addUser:PostService,private router: Router){}
  ngOnInit(): void {}
  

  userData:data={
    userName:'',
    lastName:'',
    email:'',
    pass:'',
    Cpass:''
  }

 
  login(){
    console.log(this.userData);
    if(!this.validatePass()){
      alert("Pass Doesn't Match");
      return;

    }
    this.addUser.saveUser(this.userData).subscribe(response =>{
    this.userData=response;
    });
    this.router.navigate(['/user']);
    
  }
  validatePass(){
    return this.userData.pass == this.userData.Cpass
  }
  // deleteUser(){
  //   this.deleteUser();
  // }

}
