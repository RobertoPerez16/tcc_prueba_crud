import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ClientService } from "../../service/client.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertComponent } from "../alert/alert.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { client: any }, private dialog: MatDialog, private clientService : ClientService, private dialogRef: MatDialogRef<EditModalComponent>) {}

  editClientForm = new FormGroup({
    name: new FormControl(this.data.client?.nombre, Validators.required),
    gender: new FormControl(this.data.client?.genero, Validators.required),
    identificationNumber: new FormControl(this.data.client?.nro_identificacion),
    identificationType: new FormControl(this.data.client?.tipoidentificacion)
  });

  loading: boolean = false;

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
  ]

  alert = {
    show: false,
    message: '',
    title: ''
  }

  editClient () {
    if (this.editClientForm.valid) {
      const client = {
        name: this.editClientForm.controls.name.value,
        identificationType: this.editClientForm.controls.identificationType.value,
        identificationNumber: this.editClientForm.controls.identificationNumber.value,
        gender: this.editClientForm.controls.gender.value
      }
      this.loading = true;
      this.clientService.editClients(client).subscribe((data: any) => {
        console.log('data:', data);
        if (data.statusCode === 200) {
          this.loading = false;
          this.alert.title = 'Éxito';
          this.alert.message = 'Editado creado correctamente!'
          this.loading = false;
          const dialog = this.alert;
          const editDialogRef = this.dialog.open(AlertComponent, {
            width: '500px',
            data: { dialog },
            disableClose: false,
          });

          editDialogRef.afterClosed().subscribe(result => {
            console.log('result', result);
          });
          this.dialogRef.close();
        }

        if (data.statusCode === 400 || data.statusCode === 500) {
          this.alert.show = true;
          this.alert.title = 'Error'
          this.alert.message = data.message || 'Lo sentimos, no se pudo editar el cliente o ya se encuentra registrado.'
          this.loading = false;
        }
      });
    }
  }
}
