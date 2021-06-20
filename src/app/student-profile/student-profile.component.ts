import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDataService } from '../student-data.service';
import { StudentdataModel } from '../student-home/student.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  emailConfirmed:Boolean=false;
  student:StudentdataModel;
  // Google Pay
  paymentRequest : google.payments.api.PaymentDataRequest ={
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'ICTAK CourseFees'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: '1250.00',
      currencyCode: 'INR',
      countryCode: 'IN'
    },
    callbackIntents:['PAYMENT_AUTHORIZATION']
  };
  onLoadPaymentData=(event:Event):void=>{
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }
  onPaymentDataAuthorized : google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) =>{
    console.log('payment authorized', paymentData);
    this.authService.paidUpdate(this.id,this.email).subscribe(data=>{
      alert('PAyemnt Successful');
    })
    return{
      transactionState:'SUCCESS'
    }
  }
  onError = (event:ErrorEvent):void=>{
    console.error('error', event.error)
  }
  id:any;
  email:String;
  constructor(
    private route:ActivatedRoute,
    private authService:StudentDataService
  ) { }

  ngOnInit(): void {

  const token=this.route.snapshot.paramMap.get('token');
   console.log(token);
   this.authService.confirmEmail(token).subscribe((data)=>{
     console.log(data);
     this.student=JSON.parse(JSON.stringify(data));
    console.log(this.student);
    this.email=this.student.Email
    console.log(this.email);
    this.id=this.student._id;
    console.log(this.id);
    this.emailConfirmed=true;
  },
  (error)=>{
    this.emailConfirmed=false;
  })
  }
}

