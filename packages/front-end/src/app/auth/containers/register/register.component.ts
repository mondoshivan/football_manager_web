import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [""],
      email: ["", Validators.email],
      password: [""],
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

}
