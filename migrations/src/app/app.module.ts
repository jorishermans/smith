import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ControlflowComponent } from './controlflow/controlflow.component';
import { CountComponent } from './count/count.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlflowComponent,
    CountComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
