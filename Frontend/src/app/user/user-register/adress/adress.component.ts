import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adresa } from 'src/app/model/adresa';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css'],
})
export class AdressComponent implements OnInit {
  adressForm!: FormGroup;
  @Output() adress = new EventEmitter<Adresa>();
  @Input() changes: number = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.adressForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      streetName: ['', [Validators.required]],
      streetNumber: ['', [Validators.required]],
      building: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
    });
  }

  ngOnChanges() {
    if (this.changes != 0) {
      if (this.adressForm.valid) {
        this.adress.emit(this.adressForm.value);
        this.adressForm.reset();
      }
    }
  }
}
