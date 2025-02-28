import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ContactsComponent} from "./contacts/contacts.component";


@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-contacts></app-contacts>`,
  imports: [HttpClientModule, ContactsComponent]
})
export class AppComponent {}
