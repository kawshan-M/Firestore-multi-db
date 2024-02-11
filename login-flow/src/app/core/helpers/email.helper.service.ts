import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Email : any;

@Injectable({
  providedIn: 'root'
})
export class EmailHelperService {


  constructor() { }

  sendEmails(usermail: string, otp: string) {
    return new Promise((resolve, reject) => {
        return Email.send({
            Host : environment.emailHost,
            Username : environment.accountOwnerEmail,
            Password : environment.accountOwnerPassword,
            From : environment.accountOwnerEmail,
            To : usermail,                
            Subject : "Winnipeg ToDo OTP",
            Body : otp
        }).then( (message: string) => {
            if(message=='OK'){
              console.log("maleesha Send Emails if",message);
                resolve(message);
            }else{
              console.log("maleesha Send Emails else",message);
                reject(message);
            }
        });
    })
}
}
