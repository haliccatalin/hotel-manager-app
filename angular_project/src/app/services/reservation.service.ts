import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "./customer.service";
import {ConfigurationsService} from "./configurations.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationObservable = new BehaviorSubject<Array<any>>([]);

  constructor(private appConfig: ConfigurationsService, private httpClient: HttpClient, private userService: CustomerService) {
    this.readReservations();
  }


  public getReservations() {
    return this.reservationObservable.asObservable();
  }

  public createReservation(body: any) {
    return this.httpClient.post(`${this.appConfig.getApiUrl()}/reservations/addReservation`, body);
  }

  public deleteReservation(id: string) {
    this.httpClient.delete(`${this.appConfig.getApiUrl()}/reservations/deleteReservationById/${id}`).subscribe((response: any) => {
      console.log(response);
      this.readReservations();
    })
  }

  public confirmReservation(id: string) {
    this.httpClient.post(`${this.appConfig.getApiUrl()}/reservations/confirmReservationById/${id}`, {}).subscribe((response: any) => {
      console.log(response);
      this.readReservations();
    })
  }

  public canceledReservation(id: string) {
    this.httpClient.post(`${this.appConfig.getApiUrl()}/reservations/cancelReservationById/${id}`, {}).subscribe((response: any) => {
      console.log(response);
      this.readReservations();
    })
  }

  public readReservations() {
    return this.httpClient.get(`${this.appConfig.getApiUrl()}/reservations`).subscribe((response: any) => {
      this.reservationObservable.next(response.data)
    });
  }

  private parseDate() {
    let date = new Date();
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
