import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  url = 'http://localhost:3000/trades'
  constructor(private http:HttpClient) {  }

  insertTrade(tradeData:any){
    return this.http.post('http://localhost:3000/trades',tradeData)
   }


 
  getTrade(){
    return this.http.get('http://localhost:3000/trades')
   }
  getTradeId(id:any){
    return this.http.get(`${this.url}/${id}`)
   }


  updateTrade(tradeData:any,tradeId:any){
    return this.http.put(`${this.url}/${tradeId}`,tradeData)

  }
  DeleteTrade(tradeId:any){
    return this.http.delete(`${this.url}/${tradeId}`)
  }
}
