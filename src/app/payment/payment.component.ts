import { Component, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Payment } from '../shared/payment.model';
import { PaymentService } from '../shared/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payment_id!: number;
  paymentObj: Payment = {} as Payment;
  paymentList : Payment[] = [];

  passItem: Payment={} as Payment;

  constructor(private paymentService : PaymentService, private toastr: ToastrService) { }

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

  deleteData() {
    this.paymentService.deleteData(this.paymentObj.paymentDetailId).subscribe((res) => {
      this.toastr.success(
        'Data Payment Deleted Successfully',
        'Payment Detail Delete'
      );
      let c = document.getElementById('cancelDelete');
        c?.click();
      this.getAllData();
    });
  }

  dataDel(data: Payment) {
    this.paymentObj.paymentDetailId = data.paymentDetailId ;
    this.paymentObj.cardOwnerName = data.cardOwnerName  ;

  }
}
