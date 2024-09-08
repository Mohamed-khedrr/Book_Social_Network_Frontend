import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AuthenticationService } from '../../../api-services/services';
import { Register$Params } from '../../../api-services/fn/authentication/register';
import { RegistrationRequest } from '../../../api-services/models/registration-request';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthenticationService);
  router = inject(Router);
  tokenService = inject(TokenService);
  fb = inject(FormBuilder);
  errMsg: string = '';

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {}

  registerNewAccount() {
    const loginBody: RegistrationRequest = {
      email: this.registerForm.controls.email.value as string,
      password: this.registerForm.controls.password.value as string,
      firstName: this.registerForm.controls.firstName.value as string,
      lastName: this.registerForm.controls.lastName.value as string,
    };

    const registerParams: Register$Params = {
      body: loginBody,
    };

    this.errMsg = '';

    this.authService.register(registerParams).subscribe({
      next: (res) => {
        this.router.navigate(['/activate-account']);
      },
      error: (err) => {
        console.log(err);
        this.errMsg = err.error?.errorDescription || err.error.error;
      },
    });
  }

  toLoginPage() {
    console.log(this.registerForm.touched);
    // this.router.navigate(['/login']);
  }
}
