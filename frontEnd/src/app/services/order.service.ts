import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http:HttpClient) { }

  getOrders(page: number, limit: number){
    const url = `${this.apiUrl}?page=${page}&limit=${limit}`;
    return this.http.get(url)
  }



  getOrderById(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

  orderCreate(orderData:any){
    return this.http.post('http://localhost:3000/orders/orderCreate',orderData)
   }

   confirmOrder(orderId: string){
    return this.http.put<any>(`${this.apiUrl}/confirm/${orderId}`, {});
  }

  updateOrderStatus(id: number, status: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, { status });
  }

  deleteOrder(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}
