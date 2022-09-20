import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Adresa } from 'src/app/model/adresa';

imports: [FormsModule, ReactiveFormsModule, AlertifyService];

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;
  addresses: Adresa[] = [];
  changes: number = 0;
  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        userName: [null, Validators.required],
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.maxLength(10),
        ]),
      },
      { validators: this.passwordMatchingValidator }
    );
  }

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value
      ? null
      : { notmatched: true };
  }

  async onSubmit() {
    this.changes = 1;
    console.log(this.registrationForm.value);
    this.userSubmitted = true;
    if (this.registrationForm.valid && this.addresses.length>0) {
      this.userService.addUser(await this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertify.success('You are now succesfully registered');
    } else {
      this.alertify.error('Register failed');
    }
  }

  async userData(): Promise<User> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          (this.user = {
            userName: this.userName.value,
            email: this.email.value,
            password: this.password.value,
            mobile: this.mobile.value,
            adresses: this.addresses
          })
        );
      }, 1000);
    });
  }

  setAdress(value: any) {
    console.log(value);
    this.addresses.push(value);
  }

  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registrationForm.get('email') as FormControl;
  }

  get password() {
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }
  get adresses() {
    return this.registrationForm.get('adresses') as FormControl;
  }
  get streetName() {
    return this.registrationForm.get('streetName') as FormControl;
  }
  get streetNumber() {
    return this.registrationForm.get('streetNumber') as FormControl;
  }
  get Building() {
    return this.registrationForm.get('Building') as FormControl;
  }
  get postalCode() {
    return this.registrationForm.get('postalCode') as FormControl;
  }

}
