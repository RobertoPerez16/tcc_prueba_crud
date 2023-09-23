import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClientService } from "../../service/client.service";
import { AlertComponent } from "../alert/alert.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.scss']
})
export class AddclientComponent {

  constructor(private clientService: ClientService, private matDialog: MatDialog) {
  }
  loading: boolean = false;
  alert = {
    show: false,
    message: '',
    title: ''
  }

  clientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    identificationNumber: new FormControl('', Validators.required),
    identificationType: new FormControl('', Validators.required)
  });

  identificationTypes = [
    {
      value: 'CC'
    },
    {
      value: 'NIT'
    },
    {
      value: 'CE'
    },
    {
      value: 'PS'
    },
    {
      value: 'NU'
    },
    {
      value: 'TI'
    },
    {
      value: 'EX'
    },
    {
      value: 'RUC'
    }
  ];

  createUser () {
    if (this.clientForm.valid) {
      console.log(this.clientForm.controls);
      const client = {
        name: this.clientForm.controls.name.value,
        identificationType: this.clientForm.controls.identificationType.value,
        identificationNumber: this.clientForm.controls.identificationNumber.value,
        gender: this.clientForm.controls.gender.value
      }
      this.loading = true;
      this.clientService.saveClients(client).subscribe((data: any) => {

        if (data.statusCode === 200) {
          this.alert.title = 'Éxito';
          this.alert.show = true;
          this.alert.message = 'Cliente creado correctamente!'
          this.loading = false;
          const dialog = this.alert;
          const dialogRef = this.matDialog.open(AlertComponent, {
            width: '500px',
            data: { dialog },
            disableClose: false,
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('result', result);
          });
          this.clientForm.reset();
        }

        if (data.statusCode === 400 || data.statusCode === 500) {
          this.alert.title = 'Error';
          this.alert.show = true;
          this.alert.message = data.message || 'No se pudo crear el cliente';
          this.loading = false;
        }

      });
    }
  }
}
