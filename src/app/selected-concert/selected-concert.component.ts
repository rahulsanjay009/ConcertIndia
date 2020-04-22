import { Component, OnInit } from '@angular/core';
import { Concert } from 'models/concert';
import { ActivatedRoute } from '@angular/router';
import {MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import { SeatsComponent } from '../seats/seats.component';
import {Pass} from 'models/pass';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-selected-concert',
  templateUrl: './selected-concert.component.html',
  styleUrls: ['./selected-concert.component.css']
})
export class SelectedConcertComponent implements OnInit {
  selectedConcert:Concert={} as Concert;
  constructor(private route:ActivatedRoute,private dialog:MatDialog,private router:Router,private fs:FirebaseService) { }
  pass:Pass={} as Pass;
  ngOnInit() {
      this.selectedConcert=JSON.parse(this.route.snapshot.paramMap.get('id'));
      console.log("slected Component ::::  ", this.selectedConcert);
      window.scrollTo(0,0);
  }
  buy(){

      let dialogref=this.dialog.open(SeatsComponent,{
        height:'20%',
        width:'50%'
      });
      dialogref.afterClosed().subscribe((result)=>{
           this.pass.concert=this.selectedConcert;
           this.pass.qty=result;
           if(result>=1&&result<7)
                this.router.navigate(['/confirm',JSON.stringify(this.pass)]);
      })
    
    }
}
