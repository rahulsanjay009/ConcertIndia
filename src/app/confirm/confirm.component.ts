import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from 'models/concert';
import { FirebaseService } from '../services/firebase.service';
import { Ittop } from 'models/ittop';
import{MatDialog} from '@angular/material';
import { Pass } from 'models/pass';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {ConfirmedComponent} from '../confirmed/confirmed.component';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  selectedConcert:Concert;
  price:number=0;
  pass:{
    concert:Concert,
    qty:number
  }={} as any;
  constructor(private route:ActivatedRoute,private fs:FirebaseService,private dialog:MatDialog,private router:Router,
    private af:AngularFirestore) { 

    
  }

  ngOnInit() {
    window.scrollTo(0,0);
      this.pass=JSON.parse(this.route.snapshot.paramMap.get('cnf'));
      this.selectedConcert=this.pass.concert;
      this.price=(this.pass.qty)*this.pass.concert.price;
  }
  confirm(){
    var user:Ittop={} as Ittop;
    
    var ticket:Pass[]=[];
      var temp=JSON.parse(localStorage.getItem('loggedIn'));
      user.name=temp.name;
      user.email=temp.email;
      user.password=temp.password;
      user.phone="";
      user.myTickets=[];
      
   this.af.collection<Ittop>("users").doc(user.name).get().subscribe((result)=>{
                if(result.data().myTickets==undefined)
                      user.myTickets=[];
                else
                    user.myTickets.push(...result.data().myTickets);

                console.log("online dbconcerts...")    
                console.log(result.data().myTickets);    
                user.myTickets.push({concert:this.selectedConcert,qty:this.pass.qty});
                console.log(user.myTickets);     
                console.log(user);
                this.fs.updateUser('users',user).then((data)=>{ console.log("Confirmed..")});        
      });
     
      
      
      let dialogref=this.dialog.open(ConfirmedComponent,{
        height:'20%',
        width:'40%'
      });
      
      setTimeout(()=>{
        dialogref.close();
        this.router.navigate(['/mytickets']);
      },500);
        
      
  }
}
