import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Ittop } from 'models/ittop';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http:HttpClient, private db:AngularFirestore ) { }


  getUsers(ittop) {
    return this.db.collection(`${ittop}`);
  }
  
  sendemail(matter:string){
    console.log(matter);
    this.http.post<any>("https://api.elasticemail.com/v2/email/send?"+matter,{}).subscribe((data)=>{
      console.log(data);
      console.log(matter);
    });
  }
  getUser(ittop,id) {
    return this.db.doc(`${ittop}/${id}`);
  }

  updateUser(ittop: string,baka: Ittop) {
    console.log("From service  ");
    console.log(baka);
    return this.db.doc(`${ittop}/${baka.name}`).set(baka);
  }
  
  addUser(coll: string,item: any){
    return this.db.doc(`${coll}/${item.name}`).set(item);
  }

  
  removeUser(ittop,id) {
    return this.db.doc(`${ittop}/${id}`).delete();
  }

}
