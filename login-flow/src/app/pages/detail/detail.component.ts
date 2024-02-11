import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  email: string = "";
  otp: string = "";
  password: string = "";
  firstName: string= "";
  lastName: string= "";
  checks: boolean = false;
  checked: boolean = false;
  secret: string = '';
  qrCodeURI: string = '';
  isVerified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore,
    private messageService: MessageService,
    private http: HttpClient,
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.otp = params['otp'];

      this.http.post('https://us-central1-node-deploy-23b01.cloudfunctions.net/api/api/generate-2fa', {})
        .subscribe((response: any) => {
          this.secret = response.secret;
          this.qrCodeURI = response.uri;
        }, (error) => {
          console.error('Error generating 2FA:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error generating 2FA' });
        });
    });

  }

  twoFa(){
    const payload = {
      token: this.otp,
      secret: this.secret
    };

    this.http.post('https://us-central1-node-deploy-23b01.cloudfunctions.net/api/api/verify-2fa', payload)
      .subscribe((response: any) => {
        if (response.verified) {
          // TOTP verification successful, proceed with user registration
          this.isVerified = true;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User successfully Verified' });
        } else {
          // TOTP verification failed
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid verification code' });
        }
      }, (error) => {
        console.error('Error verifying TOTP:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error verifying TOTP' });
      });
  }

  check(){
    if (this.checked) {
      this.checks = true;
    }else{
      this.saveUserDetails();
    }
  }

  saveUserDetails() {
    this.auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Save user details to Firebase Firestore
      this.firestore.collection('users').add({
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        //userId: user.uid // You can use the UID as a unique identifier
      }).then(() => {
        console.log('User details saved to Firestore');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User successfully Authenticated' });
      }).catch((error) => {
        console.error('Error saving user details to Firestore:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error saving user details to Firestore' })
      });

        window.location.href = '/land';
      })
      .catch((error) => {
        // Handle registration errors
        console.error('Error registering user:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error registering user' })

      });
  }

}
