import { Component, OnInit } from '@angular/core';
import { menu_item } from './interfaces/meal_option';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  Menu: menu_item[] | null | undefined;
  constructor (private orderS: OrderService) {

  }

  ngOnInit(): void {
    this.orderS.getMenu().subscribe((data) => {
      this.Menu = data;
    })
  }
  title = 'CLS';
}
