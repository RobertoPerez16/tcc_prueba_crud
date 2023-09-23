import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Environment } from "../environment";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get(Environment.microserviceSecondUrl);
  }

  saveClients (client: any) {
    return this.http.post(Environment.microserviceFirstUrl, client);
  }

  editClients (client: any) {
    return this.http.put(`${ Environment.microserviceFirstUrl }/${ client.identificationNumber }`, client);
  }

  deleteClients (idNumber : string) {
    return this.http.delete(`${ Environment.microserviceFirstUrl }/${ idNumber }`);
  }
}
