import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SelectedConcertComponent } from './selected-concert/selected-concert.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from 'angularfire2';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material'
import { SeatsComponent } from './seats/seats.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmComponent } from './confirm/confirm.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SelectedConcertComponent,
    RegistrationComponent,
    LoginComponent,
    SeatsComponent,
    ConfirmComponent,
    MyTicketsComponent,
    ConfirmedComponent
  ],
  entryComponents:[SeatsComponent,ConfirmedComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxQRCodeModule,
    MatSnackBarModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
