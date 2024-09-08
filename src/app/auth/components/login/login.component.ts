import { TokenService } from './../../services/token.service';
import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../../api-services/models/login-request';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../../api-services/services';
import { Login$Params } from '../../../api-services/fn/authentication/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  tokenService = inject(TokenService);
  fb = inject(FormBuilder);
  errMsg: string = '';

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    const loginBody: LoginRequest = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    };

    const loginParams: Login$Params = {
      body: loginBody,
    };

    this.authService.login(loginParams).subscribe({
      next: (res) => {
        this.tokenService.setToken(res.token as string);
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.errMsg = err.error?.errorDescription;
      },
    });
  }

  toRegisterPage() {
    this.router.navigate(['/register']);
  }
}
