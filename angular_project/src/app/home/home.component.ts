import { Component } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {Router} from "@angular/router";
import {ListRoomsComponent} from "../list-rooms/list-rooms.component";
import {CartButtonComponent} from "./cart-button/cart-button.component";
import {CustomerService} from "../services/customer.service";
import {NgIf} from "@angular/common";
import {ConfigurationsService} from "../services/configurations.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    ListRoomsComponent,
    CartButtonComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public appConfig: ConfigurationsService, private router:Router , private userService:CustomerService){

  }
  isUserAdmin(){
    if(this.userService.getLoggedUser() != null && this.userService.getLoggedUser().userRole == "ADMIN"){
      return true;
    }
    return false;

  }
  onDashboard(){
    this.router.navigate(['/','dashboard']);
  }
  onLogOut(){
    this.router.navigate(['/','auth']);
  }
}