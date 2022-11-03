import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  loggoutSuccess = false; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout().subscribe(() => {
      this.loggoutSuccess = true;
    });
  }

}
