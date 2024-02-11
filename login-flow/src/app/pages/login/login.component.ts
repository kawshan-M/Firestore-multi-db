import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  value: number | undefined;
  userEmail: string | undefined;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToOtp() {
    // Navigate to the OTP component
    this.router.navigate(['/auth'], { queryParams: { email: this.userEmail } });
  }

}
