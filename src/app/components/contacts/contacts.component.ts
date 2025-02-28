import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from './contact';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import {ContactService} from "../service/contacts.service";


@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  imports: [CommonModule, ContactFormComponent]
})
export class ContactsComponent {
  contacts = signal<Contact[]>([]);

  constructor(private contactService: ContactService) {
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.loadAll().subscribe((list) => {
      this.contacts.set(list);
    });
  }

  handleContactAdded() {
    this.loadContacts();  // Refresh contact list when new contact is added
  }
}
