import { Component, OnInit } from '@angular/core';
import { Concert } from 'models/concert';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  concerts:Concert[]=[ {
    name:'THE ELECTRON',
    genre:'HipHop',
    date:'22/06/2010',
    location:'chennai',
    venue:'CHENNAI',
    time:'11:00 PM',
    celebrities : [{
      name:'ED SHAREEN',
      imgUrl:'assets/4.jpg'
    },
    {
      name:'CHARLIE PUTH',
      imgUrl:'assets/5.jpg'
    },
    {
      name:'ED SHAREEN',
      imgUrl:'assets/4.jpg'
    }
  ],
    about:{
      description:'GET YOUR SOULS OUT!!!',
      terms:'nothing more'
    },
    imgUrl:'assets/1.jpg'
} ];
alldata:Concert[]=[];
  matter:string;
  rangeFilter:number[]=[];
  locationFilter:string[]=[];
  genreFilter:string[]=[];
  cities:string[]=["Hyderabad","Goa","Mumbai"];
  genres:string[]=["Rock","Jazz","Electronic","Folk"];
  SelectedConcert:Concert= {} as Concert;
  search="";
  constructor(private router:Router,private fs:FirebaseService,private route:ActivatedRoute, private _snackBar:MatSnackBar ) {

        
   }

  ngOnInit() {
      this.fs.getUsers('CONCERTS').valueChanges().subscribe((data:Concert[])=>{
          this.concerts=data;
          this.alldata=data;
      })
      
      
  }
  selectedConcert(x){
      this.SelectedConcert=x;
      console.log(this.SelectedConcert);

      this.router.navigate(['/selectedConcert/',JSON.stringify(this.SelectedConcert)])
  }
  Apply(){
    this.concerts=[];
    if(this.rangeFilter.length==0)
    {
      this.rangeFilter[0]=0;
      this.rangeFilter[1]=100000;
    }
    if(this.locationFilter.length==0)
    {
      this.locationFilter=this.cities;
    }
    if(this.genreFilter.length==0)
    {
      this.genreFilter=this.genres;
    }
    console.log(this.genreFilter+" genre filter");
    console.log(this.locationFilter+" location filter");
    console.log(this.rangeFilter," range filter ");
    for(let i of this.alldata)
    {
      console.log(i);
      if(Number(i.price)<=this.rangeFilter[1]&&Number(i.price)>=this.rangeFilter[0])
        for(let j of this.locationFilter)
          if(j==i.location)
          {
            for(let k of this.genreFilter)
              if(k==i.genre)
              {
                let it=0
                for(it=0;it<this.concerts.length;it++)
                  if(this.concerts[it]==i)
                    break;
                if(it==this.concerts.length)
                  this.concerts.push(i);
              }
          }
    }
  this.cities=["Hyderabad","Goa","Mumbai"];
  this.genres=["Rock","Jazz","Electronic","Folk"];
    console.log(this.cities);
    console.log(this.genres);
    console.log(this.concerts);
  }
  Reset(){
    this.fs.getUsers('CONCERTS').valueChanges().subscribe((data:Concert[])=>{
      this.concerts=data;
  })
  this.genreFilter=[];
  this.locationFilter=[];
  this.rangeFilter=[];
    document.forms[0].reset();
    document.forms[1].reset();
    document.forms[2].reset();
  }
  subscribe(x){
    console.log(x);
    let apikey="83B7DE98A7D5948A27A2444BC6677D847EF19EEB336633695D45EA2229CB9F79EB25ED8269E4061AD4812AC4CA700452";
    let bodyText="Hello "+JSON.parse(localStorage.getItem('loggedIn')).name+", you are sucessfully subscribed for Concerts!!*_*!!";
    console.log(JSON.parse(localStorage.getItem('loggedIn')).name)
    let bodyHtml="<br/>Do not miss your favourite concert...<br/>Book the tickets in our website and experience the joy!<br/>Thank you..";
    let subject="Sucessfull Subscription for Concerts^_^!";
    let replyTo="abbhinav.nomulla656@gmail.com"
    this.matter="apikey="+apikey+"&from="+replyTo+"&fromName=abbhinav nomulla&to="+x+"&bodyText="+bodyText+"&bodyHtml="+bodyHtml+"&subject="+subject+"&replyTo="+replyTo;
    this.fs.sendemail(this.matter);
    this._snackBar.open("Subscribed successfully", "",{
      duration: 3000,
    });
    document.forms[3].reset();
  }
  addLocation(event,x){
    if(event.currentTarget.checked==true)
        this.locationFilter.push(x);  
    else{
      let baka:string[]=this.locationFilter;
      this.locationFilter=[]
      for(let i of baka)
        if(i!=x)
          this.locationFilter.push(i);
      console.log(this.locationFilter);
    }
  }
  addGenre(event,x){
    if(event.currentTarget.checked==true)
      this.genreFilter.push(x);
    else{
      let baka:string[]=this.genreFilter;
      this.genreFilter=[]
      for(let i of baka)
        if(i!=x)
          this.genreFilter.push(i);
      console.log(this.genreFilter);
    }
  }
  addRange(x){
    this.rangeFilter[0]=x;   
}
addRange1(x){
    this.rangeFilter[1]=x;   
}
}
