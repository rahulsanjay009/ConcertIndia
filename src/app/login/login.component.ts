import { Component, OnInit } from '@angular/core';
import{ FormGroup,Validators, FormBuilder} from '@angular/forms';
import {Ittop} from 'models/ittop';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { MatSnackBar } from "@angular/material/";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  item: Ittop[]=[];
  constructor(private formBuilder: FormBuilder,private router: Router,private bk:FirebaseService,private snackbar:MatSnackBar) {
    
   }

  ngOnInit() {
    this.item=[];
    this.loading=false;
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get f() { return this.registerForm.controls; }  

  onSubmit() {
    this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
    this.loading=true;
    var nn=this.registerForm.get('username').value;
    var a=this.registerForm.get('password').value;
    var ab=this.bk.getUser("users",nn).valueChanges().subscribe((baka: Ittop)=>{
      if(baka==null){
        ab.unsubscribe();
        this.router.navigate(['/register']);
      }
      else if(a==baka.password){
        ab.unsubscribe();
        localStorage.setItem('loggedIn',JSON.stringify(baka));
        this.snackbar.open("Welcome to Sofar, "+baka.name+"!^_^!", "",{
          duration: 3000,
        });
        setTimeout(()=>{
          this.router.navigate(['/home']).then(()=>{
            window.location.reload();
          });
        },2000);  
      }
      else {
        ab.unsubscribe();
        this.router.navigate(['/register']);
      }
    });
    this.loading=false;
  }

}
