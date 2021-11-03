import { Component, Input, OnInit, Output } from '@angular/core';
import { Payment } from '../shared/payment.model';
import { PaymentService } from '../shared/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment_id!: number;
  paymentObj!: Payment;
  paymentList : Payment[] = [];

  passItem: Payment={} as Payment;

  constructor(private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.getAllData();
  }


  getAllData() {
    this.paymentService.getData().subscribe((res) => {
      this.paymentList = res;
    });
  }

  onEditForm(data : Payment){
    this.passItem = data;
  }
}
