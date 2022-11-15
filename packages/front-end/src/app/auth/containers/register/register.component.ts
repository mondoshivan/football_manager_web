import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseDTO } from '@football-manager/data-transfer';
import { formConfig } from '../../config/form';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';
  registerForm!: FormGroup;
  formConfig: any = {}

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formConfig = formConfig;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(formConfig.name.minLength)
        ]
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(formConfig.password.minLength)
        ]
      ],
    });
  }

  register() {

    const params = {
      name: this.registerForm.controls['name'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
    };

    this.authService.register(params).subscribe({
      error: (error: HttpErrorResponse) => {
        const authResponse = error.error as AuthResponseDTO;
        this.errorMessage = authResponse.message;
      },
      complete: () => this.router.navigate([this.authService.CONFIRM_PATH])
    });
  }

  get email() { return this.registerForm.get('email'); }

  get name() { return this.registerForm.get('name'); }

  get password() { return this.registerForm.get('password'); }

}
