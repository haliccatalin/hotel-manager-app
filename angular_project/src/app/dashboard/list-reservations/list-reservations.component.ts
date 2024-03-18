import {Component} from '@angular/core';
import {ReservationService} from "../../services/reservation.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-list-reservations',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    MatIconModule
  ],
  templateUrl: './list-reservations.component.html',
  styleUrl: './list-reservations.component.css'
})
export class ListReservationsComponent {
  reservations: Array<any> = [];

  constructor(private cartService: ReservationService) {
    this.cartService.getReservations().subscribe((reservationsList:Array<any>) => {
      this.reservations = reservationsList;
    })
  }

  onDelete(reservation:any){
    this.cartService.deleteReservation(reservation.id);
  }

  onConfirm(reservation: any) {
    this.cartService.confirmReservation(reservation.id)
  }

  onCanceled(reservation: any) {
    this.cartService.canceledReservation(reservation.id)
  }

}
