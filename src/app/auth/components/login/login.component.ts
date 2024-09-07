import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../../api-services/models/login-request';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../api-services/services';
import { Login$Params } from '../../../api-services/fn/authentication/login';

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

  login() {
    const loginParams: Login$Params = {
      body: this.authRequest,
    };
    this.authService.login(loginParams).subscribe({
      next(res) {
        console.log(res);
      },
      error(err) {
        console.log(err);
      },
    });
  }

  register() {}
}
