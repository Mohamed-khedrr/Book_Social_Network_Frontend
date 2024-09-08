import { TokenService } from './../../services/token.service';
import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../../api-services/models/login-request';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../api-services/services';
import { Login$Params } from '../../../api-services/fn/authentication/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authRequest: LoginRequest = { email: '', password: '' };
  errMsg: Array<string> = [];
  authService = inject(AuthenticationService);
  router = inject(Router);
  tokenService = inject(TokenService);

  login() {
    const loginParams: Login$Params = {
      body: this.authRequest,
    };
    this.authService.login(loginParams).subscribe({
      next: (res) => {
        this.errMsg = [];
        this.tokenService.setToken(res.token as string);
        console.log(res);
        this.router.navigate(['/books']);
      },
      error: (err) => {
        this.errMsg = [];
        console.log(err);
        if (err.error.validationErrors) {
          this.errMsg.push(err.error.validationErrors[0]);
        } else {
          this.errMsg.push(err.error.errorDescription);
        }
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
