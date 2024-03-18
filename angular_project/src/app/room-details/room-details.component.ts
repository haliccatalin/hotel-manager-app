import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ConfigurationsService} from "../services/configurations.service";
import {CustomerService} from "../services/customer.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from '@angular/material/core';
import {ReservationService} from "../services/reservation.service";
@Component({
  selector: 'app-room-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    NgForOf,
    NgIf,
    TitleCasePipe,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './room-details.component.html',
  styleUrl: './room-details.component.css'
})
export class RoomDetailsComponent implements OnInit {
  roomData: any = null;
  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);
  details = new FormControl('', [Validators.required]);

  data = {

  }
  constructor(private route: ActivatedRoute, private router: Router, private customerService: CustomerService, private roomService: RoomService, public appConfig: ConfigurationsService, private reservationService: ReservationService) {
  }



  ngOnInit(): void {
    // Retrieve ID from URL parameter
    this.route.params.subscribe(params => {
      let id = params['id'];

      if (id != null) {
        this.roomService.getRoomById(id).subscribe((response: any) => {
          console.log(response);
          this.roomData = response.data;
        })
      }
      console.log('ID from URL:', id);
    });
  }

  isUserAdmin(){
    if(this.customerService.getLoggedUser() != null && this.customerService.getLoggedUser().userRole == "ADMIN"){
      return true;
    }
    return false;

  }
  onDashboard(){
    this.router.navigate(['/','dashboard']);
  }
  onHome(){
    this.router.navigate(['/','home']);
  }
  onLogOut(){
    this.router.navigate(['/','auth']);
  }

  onBooking(): void {
    if (this.customerService.getLoggedUser() == null) {
      alert("Utilizatorul nu este logat, trebuie sa te loghezi inainte sa adaugi produse in cos");
      this.router.navigate(["/", "auth"]);
    } else {
      let start = new Date(this.startDate.getRawValue()!);
      let end = new Date(this.endDate.getRawValue()!);
      let diff = Math.abs(start.getTime() - end.getTime());
      let numberOfNights = Math.ceil(diff / (1000 * 3600 * 24));

      let body = {
        "startDate": this.parseDate(start),
        "endData": this.parseDate(end),
        "total": numberOfNights * this.roomData.price,
        "details": this.details.getRawValue()!,
        "paymentStatus": "PENDING",
        "customer": {
          "id": this.customerService.getLoggedUser().id,
        },
        "roomList": [
          {
            "id": this.roomData.id
          }
        ]
      }

      console.log(body);

      this.reservationService.createReservation(body).subscribe((response: any) => {
        console.log(response);
        this.reservationService.readReservations();

        this.router.navigate(['/', 'home']);
      });
    }


  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  private parseDate(date: Date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; //lunile anului incep de la 0. Ianuarie=0
    let year = date.getFullYear();
    let dateStr = "";

    dateStr += year;
    dateStr += "-";
    if (month < 10) {
      dateStr += "0" + month;
    } else {
      dateStr += month;
    }
    dateStr += "-";
    if (day < 10) {
      dateStr += "0" + day;
    } else {
      dateStr += day;
    }
    console.log(dateStr);
    return dateStr;
  }
}
