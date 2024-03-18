import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ReservationService} from "../../services/reservation.service";
import {CartDialogComponent} from "../cart-dialog/cart-dialog.component";

@Component({
  selector: 'app-cart-button',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.css'
})
export class CartButtonComponent {
  @Input("itemCount") itemCount: number = 0;

  constructor(public dialog: MatDialog, private cartService: ReservationService) {

  }

  openCartDialog(): void {
    const dialogRef = this.dialog.open(CartDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
