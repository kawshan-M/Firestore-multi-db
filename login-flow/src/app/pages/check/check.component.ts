import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from '@capacitor-community/stripe';
import { HttpClient, HttpParams } from '@angular/common/http';
import { first, lastValueFrom } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  cardNumber: string = '';
  expMonth: string = '';
  expYear: string = '';
  cvc: string = '';
  itemName: string = 'Sample Item'; 
  itemPrice: number = 100.00;

  data: any = {
    name: 'Maleesha',
    email: 'kawshanmaleesha0@gmail.com',
    amount: 439,
    currency: 'eur'
  };

  constructor(private http: HttpClient) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
   }

  ngOnInit(): void {
    const { item } = history.state;
    if (item) {
      this.itemName = item.name;
      this.itemPrice = item.price;
    }
  }

  httpPost(body) {
    return this.http.post<any>(environment.api + 'payment-sheet', body).pipe(first());
  }

  async paymentSheet() {

    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });
    
      // const data = new HttpParams({
      //   fromObject: this.data
      // });
      // Connect to your backend endpoint, and get every key.
      const data$ = this.httpPost(this.data);

      const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(data$);

      console.log('paymentIntent: ', paymentIntent);

      // prepare PaymentSheet with CreatePaymentSheetOption.
      await Stripe.createPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        merchantDisplayName: 'todo-login'
      });

      console.log('createPaymentSheet');
      // present PaymentSheet and get result.
      const result = await Stripe.presentPaymentSheet();
      console.log('result: ', result);
      if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
        // Happy path
        this.splitAndJoin(paymentIntent);
      }
    } catch(e) {
      console.log(e);
    }
  }

  splitAndJoin(paymentIntent) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }
}
