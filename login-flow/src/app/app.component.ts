import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DAYS_THRESHOLD } from './core/constants/constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router,
    private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        if (user) {
          // Check the last login date from Firestore.
          this.firestore.collection('users').doc(user.uid).get()
            .subscribe((doc) => {
              if (doc.exists) {
                const data = doc.data() as { lastLogin: any }; // Explicitly type the data
                if (data && data.lastLogin) {
                  const lastLoginDate = new Date(data.lastLogin.toDate());
                  const currentDate = new Date();
                  const daysDifference = (currentDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24);
  
                  if (daysDifference > DAYS_THRESHOLD) {
                    // If the last login was more than 7 days ago, log the user out and navigate to the OTP page.
                    this.afAuth.signOut().then(() => {
                      this.router.navigate(['/otp'], { queryParams: { isNewUser: 'false' } });
                      console.log('User email:', user.email);
                    });
                  }
                }
              }
            });
        }
        this.router.navigate(['/home']);
        console.log('User email:', user.email);
      } else {
        // User is not authenticated, navigate to the login page.
        this.router.navigate(['/login']);
      }
    });
  }
  title = 'login-flow';
}
