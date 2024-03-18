import {Routes} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import {CustomersManagerComponent} from "./dashboard/customers-manager/customers-manager.component";
import {ReservationManagerComponent} from "./dashboard/reservation-manager/reservation-manager.component";
import {RoomsManagerComponent} from "./dashboard/rooms-manager/rooms-manager.component";
import {RoomDetailsComponent} from "./room-details/room-details.component";


export const routes: Routes = [
  {
    path: "auth", component: AuthComponent,
  },
  {
    path: "home", component: HomeComponent,
  },
  {
    path:'room-details/:id', component: RoomDetailsComponent
  },
  {
    path: "dashboard", children: [
      {path: '', component: DashboardComponent},
      {path: 'customers-manager', component: CustomersManagerComponent},
      {path: 'reservations-manager', component: ReservationManagerComponent},
      {path: 'rooms-manager', component: RoomsManagerComponent},
    ],
    // canActivate: [AuthGuard]
  },

  {
    path: "", redirectTo: "home", pathMatch: "full"
  }
];
