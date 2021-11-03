import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Payment } from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  readonly endpoint = 'http://localhost:5000/api/PaymentDetail';

  constructor(private http: HttpClient) { }

  addData(data: any) {
    return this.http.post<any>(this.endpoint, data).pipe(map((res: any) => {
      return res;
    }))
  }

  getData() {
    return this.http.get<any>(this.endpoint).pipe(map((res:any)=> {
      return res;
    }))
  }

  updateData(data: Payment, id: number) {
    return this.http.put<any>(this.endpoint+"/"+id, data)
    .pipe(map((res:any) => {
      return res;
    }))
  }

  deleteData(id: number) {
    return this.http.delete<any>(this.endpoint+"/"+id)
    .pipe(map((res:any) => {
      return res;
    }))
  }

}
