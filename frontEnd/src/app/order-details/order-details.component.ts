import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent implements OnInit{


  orderId: any;
  perUnitPrice:any;
  quantity:any
  status:any
  stockName:any
  tradeDateTime:any


  constructor(private route: ActivatedRoute,private os:OrderService) { }

  ngOnInit(): void {
    // Extract order ID from route parameters
    this.orderId = this.route.snapshot.paramMap.get('id');
    // Now you can fetch the order details using this.orderId if needed
    this.getSingleOrder()
  }

  getSingleOrder(){

    this.os.getOrderById(this.orderId).subscribe((res:any)=>{
      if(res.success){
        this.perUnitPrice=res.data[0].perUnitPrice
  this.quantity=res.data[0].quantity
  this.status=res.data[0].status
  this.stockName=res.data[0].stockName
  this.tradeDateTime=res.data[0].tradeDateTime
      }
    })
  }

}
