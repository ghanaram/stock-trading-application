import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeDetailsComponent } from './trade-details/trade-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
    { path: '', redirectTo: '/trades', pathMatch: 'full' }, // Default route redirects to '/trades'
    { path: 'trades', component: TradeDetailsComponent },
    { path: 'orders', component: OrderListComponent },
    { path: 'order-details/:id', component:OrderDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
