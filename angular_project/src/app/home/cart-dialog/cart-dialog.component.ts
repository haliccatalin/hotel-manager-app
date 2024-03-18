import {Component} from '@angular/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    NgForOf,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './cart-dialog.component.html',
  styleUrl: './cart-dialog.component.css'
})
export class CartDialogComponent {
  items: Array<any> = [];

  constructor(private reservationService: ReservationService) {

  }

  public onBuy() {

    this.reservationService.createReservation(null);
  }
}
