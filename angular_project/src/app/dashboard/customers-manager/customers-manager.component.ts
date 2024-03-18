import {Component} from '@angular/core';
import {AddEditCustomerComponent} from "../add-edit-customer/add-edit-customer.component";
import {AddEditRoomComponent} from "../add-edit-room/add-edit-room.component";
import {ListCustomersComponent} from "../list-customers/list-customers.component";
import {ListReservationsComponent} from "../list-reservations/list-reservations.component";
import {ListRoomsComponent} from "../../list-rooms/list-rooms.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {ConfigurationsService} from "../../services/configurations.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers-manager',
  standalone: true,
  imports: [
    AddEditCustomerComponent,
    AddEditRoomComponent,
    ListCustomersComponent,
    ListReservationsComponent,
    ListRoomsComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  templateUrl: './customers-manager.component.html',
  styleUrl: './customers-manager.component.css'
})
export class CustomersManagerComponent {
  customerData: any;

  constructor(public appConfig: ConfigurationsService, private router: Router) {

  }

  onChangeCustomer(user: any) {
    this.customerData = user;
  }

  onHome() {
    this.router.navigate(['/', 'home']);
  }

  onDashboard() {
    this.router.navigate(['/', 'dashboard']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
  }
}
