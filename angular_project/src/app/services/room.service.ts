import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {ConfigurationsService} from "./configurations.service";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomObservable = new BehaviorSubject<Array<any>>([]);

  constructor(private appConfig: ConfigurationsService, private httpClient: HttpClient) {
    this.readRooms();
  }

  getRoomList() {
    return this.roomObservable.asObservable();
  }

  getRoomById(id: string) {
    return this.httpClient.get(`${this.appConfig.getApiUrl()}/rooms/roomById/${id}`);
  }

  createRoom(room: any) {
    //tipuri de request:
    //GET - READ
    //POST - CREATE
    //PUT,PATCH - UPDATE
    //DELETE - DELETE
    this.httpClient.post(`${this.appConfig.getApiUrl()}/rooms/addNewRoom`, room).subscribe((response: any) => {
      console.log(response);
      console.log(response.message);

      this.readRooms();// se actualizeaza lista de elemente la fiecare adaugare
    })
  }

  updateRoom(room: any) {
    this.httpClient.put(`${this.appConfig.getApiUrl()}/rooms/updateRoom`, room).subscribe((response: any) => {
      console.log(response);
      console.log(response.message);

      this.readRooms();
    })
  }

  deleteRoom(room: any) {
  this.httpClient.delete(`${this.appConfig.getApiUrl()}/rooms/deleteRoom/${room.id}`).subscribe((response: any)=> {
    console.log(response);
    this.readRooms();
  })
  }

  readRooms() {
    this.httpClient.get(`${this.appConfig.getApiUrl()}/rooms`).subscribe((response: any) => {
      this.roomObservable.next(response.data);//lambda expresion (trimite notificari catre toti care au dat subscribe)
      console.log(response);
    })
  }

}
