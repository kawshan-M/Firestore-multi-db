import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { environment } from 'src/environments/environment';
import { SignupComponent } from './pages/signup/signup.component';
import { IonicModule } from '@ionic/angular';
import { LandComponent } from './pages/land/land.component';
import { CardComponent } from './pages/card/card.component';
import { CheckComponent } from './pages/check/check.component';
import { initializeApp } from 'firebase/app';
import { provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpComponent,
    DetailComponent,
    HomeComponent,
    SignupComponent,
    LandComponent,
    CardComponent,
    CheckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule ,
    ReactiveFormsModule,
    // Initialize the default firebase app with the first configuration object
    // AngularFireModule.initializeApp(environment.firebaseConfig1),
    AngularFireAuthModule,
    ButtonModule,
    GalleriaModule,
    CardModule,
    ImageModule,
    NgxCaptchaModule,
    ChartModule,
    ToastModule,
    DropdownModule,
    CheckboxModule,
    ToolbarModule,
    DividerModule,
    InputTextModule,
    IonicModule.forRoot()
  ],
  providers: [
    MessageService,
    // // Provide the firestore service for the default app
    // provideFirestore(() => Firestore.instance),
    // // Provide the auth service for the default app
    // provideAuth(() => Auth.instance),
    // // Initialize another firebase app with the second configuration object and a name
    // { provide: 'secondaryApp', useValue: initializeApp(environment.firebaseConfig2, 'secondary') },
    // // Provide the firestore service for the secondary app using a different token
    // { provide: 'secondaryFirestore', useFactory: (app) => provideFirestore(() => Firestore.instanceFor(app), {inject: ['secondaryApp']}) },
    // // Provide the auth service for the secondary app using a different token
    // { provide: 'secondaryAuth', useFactory: (app) => provideAuth(() => Auth.instanceFor(app), {inject: ['secondaryApp']}) },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
