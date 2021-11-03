import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Payment } from 'src/app/shared/payment.model';
import { PaymentService } from 'src/app/shared/payment.service';
import { PaymentComponent } from '../payment.component';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  @Input() dataPass!: Payment;
  dataObj: Payment = {} as Payment;
  dataEdit: Payment = {} as Payment;
  paymentDetailId_num!: number;
  editBool: boolean = false;

  form = {
    formData: new FormGroup({
      paymentDetailId: new FormControl,
      cardOwnerName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/^[0-9]+$/),
      ]),
      expirationDate: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
      ]),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern(/^[0-9]+$/),
      ]),
    }),
  };

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private payment: PaymentComponent
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (Object.keys(this.dataPass).length > 0) {
      // this.paymentDetailId_num = this.dataPass.paymentDetailId;
      this.PaymentDetailId?.setValue(this.dataPass.paymentDetailId)
      this.CardOwnerName?.setValue(this.dataPass.cardOwnerName);
      this.CardNumber?.setValue(this.dataPass.cardNumber);
      this.ExpirationDate?.setValue(this.dataPass.expirationDate);
      this.SecurityCode?.setValue(this.dataPass.securityCode);
      this.editBool = true;
      this.dataPass = {} as Payment;
    }
  }
  get PaymentDetailId() {
    return this.form.formData.get('paymentDetailId');
  }

  get CardOwnerName() {
    return this.form.formData.get('cardOwnerName');
  }

  get CardNumber() {
    return this.form.formData.get('cardNumber');
  }

  get ExpirationDate() {
    return this.form.formData.get('expirationDate');
  }

  get SecurityCode() {
    return this.form.formData.get('securityCode');
  }

  dataModif() {
    if (this.editBool == false) {
      this.addData();
    }
    else{
      this.updateData();
    }
  }

  addData() {
    this.dataObj = this.form.formData.value;
    this.dataObj.paymentDetailId = 0;
    this.paymentService.addData(this.dataObj).subscribe(
      (res) => {
        this.toastr.success(
          'Data Payment Added Successfully',
          'Payment Detail Register'
        );
        this.form.formData.reset();
        this.payment.ngOnInit();
        
      },
      (err) => {
        console.log(this.dataObj);
        this.toastr.error('Something Went Wrong', 'Error!');
      }
    );
  }

  updateData() {
    this.dataEdit = this.form.formData.value;
    this.paymentService.updateData(this.dataEdit,this.dataEdit.paymentDetailId).subscribe(
      (res) => {
        this.toastr.success(
          'Data Payment Edited Successfully',
          'Edit Payment Detail'
        );
        this.form.formData.reset();
        this.payment.ngOnInit();
        this.editBool = false;
      },
      (err) => {
        console.log(this.dataObj)
        this.toastr.error('Something Went Wrong', 'Error!');
      }
    );
  }

  
}
