import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponentComponent } from "./components/main-component/main-component.component";
import { AddclientComponent } from "./components/addclient/addclient.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponentComponent,
  },
  {
    path: 'client',
    component: AddclientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
