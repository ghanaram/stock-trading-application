import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  dataSource : any = []
  displayedColumns: string[] = ['id', 'stockName' ,'status', 'actions'];
  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageSize: number = 10;
  totalOrders: any;
  currentPage = 1;


  @ViewChild(MatPaginator) paginator: MatPaginator |  undefined;

  constructor(private os: OrderService,private router: Router) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.os.getOrders(this.currentPage,this.pageSize).subscribe((res:any) => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.totalOrders = res.length;
    });
  }

  onPageChange(event:any){
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.fetchOrders();
  }

  viewOrderDetails(order: any){
    this.router.navigate(['/order-details', order.id]);
  }

  confirmOrder(order: any) {
    this.os.confirmOrder(order.id).subscribe((res:any) => {
   if(res.success){

     Swal.fire({
       text:'Order confirmed successfully',
       icon:'success',
       timer:1000

     })
     this.fetchOrders()
   }else{
    Swal.fire({
      text:'Error confirming order',
      icon:'error',
      timer:1000

    })
   }

    });
  }


  }


