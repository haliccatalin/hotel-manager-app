import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {
  private apiUrl: string = 'http://localhost:8081/api';
  private appName: string = 'Hotel Manager'
  private appOwner: string = 'Flavius';
  private appLogo: string = 'https://zigzagprinromania.com/blog/wp-content/uploads/2015/05/Sigla_President_Auriu.jpg';

  constructor() { }

  public getApiUrl() {
    return this.apiUrl;
  }

  public getAppName() {
    return this.appName;
  }

  public getAppOwner() {
    return this.appOwner;
  }

  public getAppLogo() {
    return this.appLogo;
  }
}
