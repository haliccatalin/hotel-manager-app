import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RoomService} from "../services/room.service";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ReservationService} from "../services/reservation.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [
    MatCardModule,
    NgForOf,
    MatButtonModule,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.css'
})
export class ListRoomsComponent {
  @Output() changeData = new EventEmitter<any>();// EventEmitter ne ajuta sa transmitem obiecte inafara componentei
  @Input("isAdmin") isAdmin: boolean = false;
  rooms: Array<any> = [];

  constructor(private itemService: RoomService, private cartService: ReservationService, private userService: CustomerService, private router: Router) {
    this.itemService.getRoomList().subscribe((itemsList: Array<any>) => {
      this.rooms = itemsList; //prin acest subscribe ne asiguram ca vom primi notificari despre lista in timp real
    })

  }

  onEdit(item: any) {
    this.changeData.emit(item);
  }

  onDelete(item: any) {
    console.log(item);
    this.itemService.deleteRoom(item);
  }

  onBuy(item: any) {
    if (this.userService.getLoggedUser() == null) {
      alert("Utilizatorul nu este logat, trebuie sa te loghezi inainte sa adaugi produse in cos");
      this.router.navigate(["/", "auth"]);
    } else {
      this.router.navigate(['/', 'room-details', item.id]);
    }

  }
}
