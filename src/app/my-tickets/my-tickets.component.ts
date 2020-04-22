import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

import {Ittop} from 'models/ittop';
import { Pass } from 'models/pass';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  myconcerts: Pass[]=[];
  name:string=""
  email;
  constructor(private fs:FirebaseService) { }

  ngOnInit() {
        var name=JSON.parse(localStorage.getItem('loggedIn')).name;
        this.fs.getUser('users',name).valueChanges().subscribe((data:Ittop)=>{
            this.myconcerts.push(...data.myTickets);
            console.log(data);
        });
        console.log(this.myconcerts);
        this.name=name;
        this.email=JSON.parse(localStorage.getItem('loggedIn')).email;
        window.scrollTo(0,0);
  }

}
