import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.authService
      .register({
        name: this.f['name'].value,
        email: this.f['email'].value,
        password: this.f['password'].value,
      })
      .subscribe(
        () => this.router.navigate([this.authService.CONFIRM_PATH]),
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }

  get email() { return this.registerForm.get('email'); }

  get name() { return this.registerForm.get('name'); }

  get password() { return this.registerForm.get('password'); }

}
