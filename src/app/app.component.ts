import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project1';
  changer: string;
  f=0;
  constructor(private router:Router,private snackbar:MatSnackBar){}
  ngOnInit(){
    this.changer=JSON.parse(localStorage.getItem('loggedIn')).name;
    if(this.changer)
      this.f=1;
  }
  logout(){
    localStorage.clear();
    this.f=0;
    this.changer="";
    this.snackbar.open(" Logging you out  . . . ", "",{
      duration: 3000,
    });  
    setTimeout(()=>{
      this.router.navigate(['/home']).then(()=>{
        window.location.reload();
      });
    },2000);
   
  }

}
