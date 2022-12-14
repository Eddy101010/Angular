import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserForRegister } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

    registrationForm: FormGroup;
    user: UserForRegister;
    userSubmitted: boolean;
    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private alertify: AlertifyService ) { }

    ngOnInit() {
        this.createRegistrationForm();
    }

    createRegistrationForm() {
        this.registrationForm =  this.fb.group({
            userName: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.maxLength(10)]]
        }, {validators: this.passwordMatchingValidator});
    }

    passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
      return fc.get('password')?.value === fc.get('confirmPassword')?.value
        ? null
        : { notmatched: true };
    }


    onSubmit() {
        console.log(this.registrationForm.value);
        this.userSubmitted = true;

        if (this.registrationForm.valid) {
            this.authService.registerUser(this.userData()).subscribe(() =>
            {
                this.onReset();
                this.alertify.success('Congrats, you are successfully registered');
            });
        }
    }

    onReset() {
        this.userSubmitted = false;
        this.registrationForm.reset();
    }


    userData(): UserForRegister {
        return this.user = {
            userName: this.userName.value,
            email: this.email.value,
            password: this.password.value,
            mobile: this.mobile.value
        };
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

}
