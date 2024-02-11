import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmailHelperService } from 'src/app/core/helpers/email.helper.service';
import { OTP_TRIES } from 'src/app/core/constants/constants';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  @ViewChild('captchaElem') captchaElem: any;

  protected aFormGroup!: FormGroup;

  otp: string ="000000";
  userEmail: string ="";
  verificationAttempts: number = 0;
  userEnteredOtp: string | undefined;
  showCaptcha: boolean = false;
  siteKey: string = "6LeNGcIoAAAAAJ2qgNM2irr-HZu7usyqaiGNKNt_";
  showResendButton: boolean = false;
  isNewUser: boolean = true;
  isNewUsers: boolean = false;
  recaptchaCompleted: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private auth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private emailHelperService: EmailHelperService
    ) { 
      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['']
      });
    }
    

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'];
      // Now, this.userEmail contains the email passed from the Login component.
      if (params['isNewUser'] !== undefined) {
        this.isNewUser = params['isNewUser'] === 'false';
      }
    });

    // Generate a 6-digit OTP
    this.otp = this.generateRandomOTP();
    this.sendEmailLink()

    // console.log(this.userEmail);
    // console.log(this.otp);
  }

  generateRandomOTP(): string {
    // Generate a 6-digit random OTP
    const min = 100000;
    const max = 999999;
    const randomOTP = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomOTP.toString();
  }

  sendEmailLink() {
    this.emailHelperService.sendEmails(this.userEmail,`Your OTP is: ${this.otp}`).then(() => {
      console.log('maleesha sent successfully');
    }).catch((error) => {
      // Email sending failed
      console.error('maleesha sending failed:', error);
    });
  }

  verifyOtp(){
    if (this.otp === this.userEnteredOtp) {
      // OTP is correct
      this.verificationAttempts = 0; // Reset the attempt
      this.router.navigate(['/data'], {
        queryParams: {
          email: this.userEmail
        }
      });
    } else {
      // OTP is incorrect
      this.verificationAttempts++;
      if (this.verificationAttempts >= OTP_TRIES) {
        alert('Incorrect OTP. Please complete reCaptcha.');
        // Display reCAPTCHA when the user exceeds 3 attempts
        this.isNewUser = false;
        this.showRecaptcha();
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    }
  }

  newVerifyOtp(){
    if (this.otp === this.userEnteredOtp) {
      // OTP is correct
      this.verificationAttempts = 0; // Reset the attempt
      this.router.navigate(['/signup'], {
        queryParams: {
          email: this.userEmail
        }
      });
    } else {
      // OTP is incorrect
      this.verificationAttempts++;
      if (this.verificationAttempts >= 3) {
        alert('Incorrect OTP. Please complete reCaptcha.');
        // Display reCAPTCHA when the user exceeds 3 attempts
        this.isNewUsers = false;
        this.showRecaptcha();
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    }
  }

  showRecaptcha() {
    this.showCaptcha = true;
    this.aFormGroup.get('recaptcha')?.setValidators(Validators.required);
    this.aFormGroup.updateValueAndValidity();
    this.aFormGroup.valueChanges.subscribe(val=>{ //check recaptcha work
      console.log(val);
      this.verificationAttempts = 0;
      this.showResendButton = true;
    })
    
  }


  resendEmailLink() {

    this.otp = this.generateRandomOTP();
    console.log(this.userEmail);
    console.log(this.otp);
    this.showResendButton = false;
    this.showCaptcha = false;
    this.isNewUser = true;
    this.sendEmailLink()

    
  }
  
}
