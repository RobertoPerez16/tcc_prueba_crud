import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tcc_prueba_crud';

  constructor(private router: Router) {}


  async navigateTo () {
    await this.router.navigateByUrl('/');
  }
}
