import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";
import {appConfig} from "../app.config";
import {ConfigurationsService} from "../services/configurations.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgSwitch,
    NgSwitchCase,
    NgIf
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  viewType: string = "login";

  email = new FormControl('', [Validators.required]);
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  retypePassword = new FormControl('', [Validators.required]);

  constructor(public appConfig: ConfigurationsService, private authService: AuthService, private customer: CustomerService, private router: Router) {

  }

  getErrorMessage(input: FormControl): string {
    if (input.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  onLogIn() {
    var data = {
      email: this.email.getRawValue()!,
      password: this.password.getRawValue()!
    };
    console.log(data);
    this.authService.logIn(data).subscribe((response: any) => {
      console.log(response);
      if (response.status == 200) {
        this.customer.setLoggedUser(response.data);

        this.router.navigate(['/', 'home']);
      }
    }, (responseError) => {
      alert(responseError.error.message);
    })
  }

  onRegister() {
    if (this.password.getRawValue() == this.retypePassword.getRawValue()) {
      let data = {
        email: this.email.getRawValue()!,
        username: this.userName.getRawValue()!,
        password: this.password.getRawValue()!,
        confirmPassword: this.retypePassword.getRawValue()!
      };
      console.log(data);
      this.authService.register(data).subscribe((response: any) => {
        console.log(response);
      }, (responseError) => {
        console.log(responseError.error.message);
        alert(responseError.error.message);
      })
    } else {
      alert("Passwords not match");
    }
  }

  onSwitchViewType(viewType: string) {
    this.viewType = viewType;
  }

}
