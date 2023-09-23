import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ClientService } from "../../service/client.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmComponent } from "../dialog-confirm/dialog-confirm.component";
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss']
})
export class MainComponentComponent implements OnInit {
  displayedColumns: string[] = ['nro_identificacion', 'tipoidentificacion', 'nombre', 'genero', 'acciones'];
  clients: any = [];

  alert = {
    show: false,
    message: '',
    title: ''
  }

  constructor (private router: Router, private clientService: ClientService, private dialog : MatDialog) {
  }

  ngOnInit() {
    this.listClient();
  }

  async navigateTo () {
    await this.router.navigateByUrl('/client');
  }

  deleteUser (idNumber: string) {
    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClients(idNumber).subscribe((data: any) => {
          console.log('data: ', data);
          if (data.statusCode === 200) {

            this.alert.title = 'Éxito';
            this.alert.message = 'Eliminado creado correctamente!'
            const dialog = this.alert;
            const deleteRef = this.dialog.open(AlertComponent, {
              width: '500px',
              data: { dialog },
              disableClose: false,
            });
            deleteRef.afterClosed().subscribe(result => {
              console.log(result);
            });
            this.listClient();
          }

          if (data.statusCode === 400 || data.statusCode === 500) {
            this.alert.show = true;
            this.alert.title = 'Error'
            this.alert.message = data.message || 'Lo sentimos, no se pudo eliminar el cliente o ya se encuentra registrado.'
          }
        });
      }
    });
  }

  editClient (client: any) {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '500px',
      data: { client },
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      if (result === undefined) {
        this.listClient();
      }
    });
  }

  listClient () {
    this.clients = [];
    this.clientService.getClients().subscribe((data: any) => {
      this.clients = data?.data;
    });
  }
}
