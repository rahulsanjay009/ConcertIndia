import { Component, OnInit } from '@angular/core';
import{ FormGroup,Validators, FormBuilder} from '@angular/forms';
import {Ittop} from 'models/ittop';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  item: Ittop={} as Ittop;
  matter:string;
  constructor(private fb:FormBuilder,private fs:FirebaseService,private router:Router,public _snackBar: MatSnackBar) { 


  }

  ngOnInit() {
    window.scrollTo(0,0);

    this.loading=false;
    this.registerForm = this.fb.group({
      email:    ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cpassword: ['', [Validators.required, Validators.minLength(6)]]
    },{validator: this.checkIfMatchingPasswords()});
    
  }

  get f() { 
    return this.registerForm.controls; 
  }  

  checkIfMatchingPasswords() {
    return (group: FormGroup) => {
      let passwordInput = group.controls['password'],
          passwordConfirmationInput = group.controls['cpassword'];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }


  onSubmit() {
    this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
    this.loading=true;
    this.item.name=this.registerForm.get('username').value;
    this.item.password=this.registerForm.get('password').value;
    this.item.email=this.registerForm.get('email').value;
    
    console.log(this.item);
    var ab=this.fs.getUser("users",this.item.name).valueChanges().subscribe((baka: Ittop)=>{
      if(baka!=null){
        ab.unsubscribe();
        this._snackBar.open("Already Registered! Please Login", "",{
          duration: 3000,
        });
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },2000);
      }
      else{
        ab.unsubscribe();
        this.fs.addUser("users",this.item).then((res)=>{
          console.log(res);
        });
        localStorage.setItem('loggedIn',JSON.stringify(this.item));
        this._snackBar.open("Sucessfully Registered  ^_^!  Please check your mail (probably in spam) !!", "",{
          duration: 3000,
        });    
        let apikey="83B7DE98A7D5948A27A2444BC6677D847EF19EEB336633695D45EA2229CB9F79EB25ED8269E4061AD4812AC4CA700452";
        let bodyText="Hello "+this.item.name+", you are sucessfully registered for Sofar!!*_*!!";
        let bodyHtml="<br/>Donot miss your favourite concert...<br/>Book the tickets in our website and experience the joy!<br/>Thank you..";
        let subject="Sucessfull Registration for ConcertIndia ^_^!";
        let replyTo="abbhinav.nomulla656@gmail.com"
        this.matter="apikey="+apikey+"&from="+replyTo+"&fromName=abbhinav nomulla&to="+this.item.email+"&bodyText="+bodyText+"&bodyHtml="+bodyHtml+"&subject="+subject+"&replyTo="+replyTo;
        this.fs.sendemail(this.matter);
        setTimeout(()=>{

          this.router.navigate(['/home']).then(()=>{
          window.location.reload();
        });
        },2000);     
      }
    });
    this.loading=false;
  }
}
