import { Component, OnInit } from '@angular/core';
import { Concert } from 'models/concert';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Ittop } from 'models/ittop';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  concerts=new Set();
  alldata:Concert[]=[];
  rangeFilter:number[]=[];
  locationFilter=new Set();
  genreFilter=new Set();
  cities=new Set();
  genres=new Set();
  SelectedConcert:Concert= {} as Concert;
  matter:string;
  constructor(private router:Router,private fs:FirebaseService,private _snackBar:MatSnackBar,private af:AngularFirestore ) { }

  ngOnInit() {
    window.scrollTo(0,0);
    
    let cnt=0;
      let x=this.fs.getUsers('CONCERTS').valueChanges().subscribe((data:Concert[])=>{
        cnt=cnt+1;
        if(cnt==2)
            x.unsubscribe();
        else{
          this.alldata=data;
          for(let i of data)
          {
            this.concerts.add(i);
            this.cities.add(i.location);
            this.genres.add(i.genre);
            console.log(this.cities);
            console.log(this.genres);
          }
          console.log(this.concerts);
        }
      });
      
      /*for(let i of this.cities)
        this.cit.add(i);
      for(let i of this.genres)
        this.gen.add(i);*/
        
  }

  selectedConcert(x){
      this.SelectedConcert=x;
      console.log(this.SelectedConcert);

      this.router.navigate(['/selectedConcert/',JSON.stringify(this.SelectedConcert)])
  }
  Apply(){
    this.concerts.clear();
    let l=0,g=0;
    console.log(this.cities," cities");
    console.log(this.genres," genre");
    if(this.rangeFilter.length==0)
    {
      this.rangeFilter[0]=0;
      this.rangeFilter[1]=10000;
    }
    if(this.locationFilter.size==0)
    {
      l=1;
      for(let i of this.cities)
        this.locationFilter.add(i);
    }
    if(this.genreFilter.size==0)
    {
      g=1;
      for(let i of this.genres)
        this.genreFilter.add(i);
    }
    for(let i of this.alldata)
    {
      if(Number(i.price)<=this.rangeFilter[1]&&Number(i.price)>=this.rangeFilter[0])
        for(let j of this.locationFilter)
          if(j==i.location)
            for(let k of this.genreFilter)
              if(k==i.genre)
                this.concerts.add(i);
    }
    
    console.log(this.genreFilter," genre filter");
    console.log(this.locationFilter," location filter");
    if(l==1)
      this.locationFilter.clear();
    if(g==1)
      this.genreFilter.clear();
    console.log(this.genreFilter," genre filter");
    console.log(this.locationFilter," location filter");
    console.log(this.concerts,"concerts");
  }
  addRange(x){
      this.rangeFilter[0]=x;   
  }
  addRange1(x){
      this.rangeFilter[1]=x;   
  }
  addLocation(event,x){
    if(event.currentTarget.checked==true)
        this.locationFilter.add(x);  
    else{
      if(this.locationFilter.has(x))
        this.locationFilter.delete(x);
    }
  }
  addGenre(event,x){
    if(event.currentTarget.checked==true)
      this.genreFilter.add(x);
    else{
      if(this.genreFilter.has(x))
        this.genreFilter.delete(x);
    }
  }
  Reset(){
    this.concerts.clear();
    this.fs.getUsers('CONCERTS').valueChanges().subscribe((data:Concert[])=>{
      for(let i of data)
        this.concerts.add(i);
  })
  this.genreFilter.clear();
  this.locationFilter.clear();
  this.rangeFilter=[];
  document.forms[0].reset();
  document.forms[1].reset();
  document.forms[2].reset();
  }
  subscribe(x){
    this._snackBar.open("Subscribed successfully . . . Please check your mail (probably in spam) !!", "",{
      duration: 3000,
    });    
    let apikey="83B7DE98A7D5948A27A2444BC6677D847EF19EEB336633695D45EA2229CB9F79EB25ED8269E4061AD4812AC4CA700452";
    let bodyText="Hello "+JSON.parse(localStorage.getItem('loggedIn')).name+", you are sucessfully registered for Sofar!!*_*!!";
    let bodyHtml="<br/>Donot miss your favourite concert...<br/>Book the tickets in our website and experience the joy!<br/>Thank you..";
    let subject="Sucessfull Subscription for ConcertIndia ^_^ !";
    let replyTo="abbhinav.nomulla656@gmail.com"
    this.matter="apikey="+apikey+"&from="+replyTo+"&fromName=abbhinav nomulla&to="+x+"&bodyText="+bodyText+"&bodyHtml="+bodyHtml+"&subject="+subject+"&replyTo="+replyTo;
    this.fs.sendemail(this.matter);
    document.forms[3].reset();
  }
}