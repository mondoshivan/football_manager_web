import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user';
import { RestApiService } from 'src/app/services/rest-api/rest-api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  user? : User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser$().subscribe((user) => {
      this.user = user;
    });
  }

}
