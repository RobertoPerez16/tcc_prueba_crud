import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material //
import { MaterialModule } from "./shared/material.module";
import { MainComponentComponent } from './components/main-component/main-component.component';

// Http request enabled//
import { HttpClientModule } from "@angular/common/http";

// Enable reactive forms //
import { ReactiveFormsModule } from "@angular/forms";
import { AddclientComponent } from './components/addclient/addclient.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponentComponent,
    AddclientComponent,
    DialogConfirmComponent,
    EditModalComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
