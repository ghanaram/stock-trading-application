
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TradeService } from '../services/trade.service';
import Swal from 'sweetalert2';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-trade-details',
  templateUrl: './trade-details.component.html',
  styleUrl: './trade-details.component.scss'
})
export class TradeDetailsComponent implements OnInit {

  trades: any
  tradesId:any


  constructor(private fb: FormBuilder, private ts: TradeService, private os: OrderService) {
  }
  tradeForm = this.fb.group({
    tradeDateTime: ['', Validators.required],
    stockName: ['', Validators.required],
    listingPrice: ['', Validators.required],
    quantity: ['', Validators.required],
    type: ['', Validators.required],
    pricePerUnit: ['', Validators.required]
  });


  ngOnInit() {
  this.fetchTrades()
  }


  fetchTrades(){
    this.ts.getTrade().subscribe((data:any)=>{
      this.trades = data
    })

  }

  onSubmit(){
    if (this.tradeForm.valid) {
      this.ts.insertTrade(this.tradeForm.value).subscribe((res:any) => {
        if(res.success){
          Swal.fire({
            icon:'success',
            text:'Trade created successfully',
            timer:2000
          })
        }
        this.fetchTrades();
        this.tradeForm.reset();
      });
    }
  }


  tradeDateTime:any
  stockName:any
  listingPrice:any
  quantity:any
  type:any
  pricePerUnit:any


tradeId(id: any){
  this.tradesId = id
this.ts.getTradeId(id).subscribe((res:any)=>{
console.log(res)
this.tradeDateTime = res[0].tradeDateTime
this.stockName = res[0].stockName
this.listingPrice = res[0].listingPrice
this.quantity = res[0].quantity
this.type = res[0].type
this.pricePerUnit = res[0].pricePerUnit
})

}

upTrade(){
if(this.tradeForm.valid){

  this.ts.updateTrade(this.tradeForm.value,this.tradesId).subscribe((res:any)=>{
    if(res.success){
      Swal.fire({
        text:'Trade updated successfuly',
        icon:'success',
        timer:1000
      })
    }else{
      Swal.fire({
        icon:'error',
        timer:1000
      })
    }
    this.fetchTrades()
    this.tradeForm.reset()
  })
}
}


createOrders(trade: any): void {
  const orderData = {
    tradeId: trade.id,
    quantity: trade.quantity,
    perUnitPrice: trade.pricePerUnit,
    type: trade.type,
    stockName: trade.stockName
  };

  this.os.orderCreate(orderData).subscribe((res:any) => {
    if(res.success){
      console.log('Order created successfully');
      Swal.fire({
        text:'Order created successfully',
        icon:'success',
        timer:1000
      })
      this.fetchTrades();
    }

  });
}



  deleteTrade(id:any){
    this.ts.DeleteTrade(id).subscribe((res:any)=>{
     if(res.success){
      Swal.fire({
        icon:'success',
        text:'Trade deleted successfully',
        timer:1000
      })

      this.fetchTrades()
     }else{
      Swal.fire({
        icon:'error',
        timer:1000
      })
     }

    })
    }


}



