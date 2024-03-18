import {Component} from '@angular/core';
import {AddEditRoomComponent} from "./add-edit-room/add-edit-room.component";
import {ListRoomsComponent} from "../list-rooms/list-rooms.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {Router} from "@angular/router";
import {AddEditCustomerComponent} from "./add-edit-customer/add-edit-customer.component";
import {ListCustomersComponent} from "./list-customers/list-customers.component";
import {ListReservationsComponent} from "./list-reservations/list-reservations.component";
import {ConfigurationsService} from "../services/configurations.service";
import {TitleCasePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AddEditRoomComponent,
    ListRoomsComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    AddEditCustomerComponent,
    ListCustomersComponent,
    ListReservationsComponent,
    TitleCasePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  roomData: any;
  customerData: any;

  constructor(public appConfig: ConfigurationsService,  private router: Router) {

  }

  onManger(type: string): void {
    switch (type) {
      case 'customers':
        this.router.navigate(['/', 'dashboard', 'customers-manager']);
        break;
      case 'rooms':
        this.router.navigate(['/', 'dashboard', 'rooms-manager']);
        break;
      case 'reservation':
        this.router.navigate(['/', 'dashboard', 'reservations-manager']);
        break;
    }
  }

  onHome() {
    this.router.navigate(['/', 'home']);
  }

  onLogOut() {
    this.router.navigate(['/', 'auth']);
  }
}
