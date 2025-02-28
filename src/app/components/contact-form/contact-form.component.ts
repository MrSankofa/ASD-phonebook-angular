import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ContactService} from "../service/contacts.service";


@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactFormComponent {

  @Output() contactAdded = new EventEmitter<void>();

  submitted = false;
  btnName = 'Submit';
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      this.contactService.postContact(this.contactForm.value).subscribe(() => {
        this.contactForm.reset();
        this.submitted = false;
        this.contactAdded.emit();  // Notify parent to refresh the contact list
      });
    }
  }
}
