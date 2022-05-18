import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { menu_item } from './interfaces/meal_option';
import { OrderService } from './services/order.service';
import { TraineeService } from './services/trainee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'CLS';
  warningMsg: string | null = null;
  warnlock = false;
  successMsg: string | null = null;
  successlock = false;
  Menu1: menu_item[] = [];
  Menu2: menu_item[] = [];
  Menu3: menu_item[] = [];
  Menu4: menu_item[] = [];
  fname: string | null = null;
  lname: string | null = null;
  constructor(private orderS: OrderService, private traineeS: TraineeService) {}

  ngOnInit(): void {
    this.orderS.getMenu().subscribe((data) => {
      data?.forEach((e) => {
        switch (e.meal_cat_id) {
          case 1:
            this.Menu1.push(e);
            break;
          case 2:
            this.Menu2.push(e);
            break;
          case 3:
            this.Menu3.push(e);
            break;
          case 4:
            this.Menu4.push(e);
            break;
        }
      });
    });
  }

  confirmName(form: NgForm) {
    let { fname, lname } = form.form.controls;
    this.traineeS
      .checkTrainee({ fname: fname.value, lname: lname.value })
      .subscribe((data) => {
        if (data) {
          form.reset();
          this.fname = fname.value;
          this.lname = lname.value;
          this.successlock = true;
          this.successMsg = 'Name Valid';
          setTimeout(() => {
            this.successMsg = null;
            this.successlock = false;
          }, 3000);
        } else {
          if (!this.warnlock) {
            this.warnlock = true;
            this.warningMsg = 'This name does not exist!';
            setTimeout(() => {
              this.warningMsg = null;
              this.warnlock = false;
            }, 3000);
          }
        }
      });
  }
  submitOrder(form: NgForm) {
    let { option1, option2, option3, option4 } = form.form.controls;
    this.orderS
      .publishOrders({
        trainee: { fname: this.fname!, lname: this.lname! },
        orders: [
          { meal_option_id: parseInt(option1.value) },
          { meal_option_id: parseInt(option2.value) },
          { meal_option_id: parseInt(option3.value) },
          { meal_option_id: parseInt(option4.value) },
        ],
      })
      .subscribe((data) => {
        if (data && !this.successlock) {
          form.reset();
          this.successlock = true;
          this.successMsg = 'Order Successful!';
          setTimeout(() => {
            this.successMsg = null;
            this.successlock = false;
          }, 3000);
        } else {
          this.warnlock = true;
          this.warningMsg = this.fname && this.lname ? 'Order Failed' : 'Valid name not submitted';
          setTimeout(() => {
            this.warningMsg = null;
            this.warnlock = false;
          }, 3000);
        }
      });
  }
}
