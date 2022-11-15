import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';
import { AuthService } from 'src/app/auth/services/auth.service';
import { formConfig } from '../../config/form';
import { AuthResponseDTO } from '@football-manager/data-transfer';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(formConfig.password.minLength)
        ]
      ]
    });
  }

  get loginFormControls() { return this.loginForm.controls; }

  login() {
    const loginRequest: LoginRequest = {
      email: this.loginFormControls['email'].value,
      password: this.loginFormControls['password'].value
    };

    this.authService.login(loginRequest).subscribe({
      error: (error: HttpErrorResponse) => {
        const authResponse = error.error as AuthResponseDTO;
        this.errorMessage = authResponse.message;
      },
      complete: () => { 
        this.router.navigate([this.authService.INITIAL_PATH]) 
      },
    });
  }

}
