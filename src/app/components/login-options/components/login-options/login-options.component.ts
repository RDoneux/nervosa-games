import { Component, OnInit, Type } from '@angular/core';
import { LoginOptionsContentComponent } from '../login-options-content/login-options-content.component';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.component.html',
  styleUrls: ['./login-options.component.scss'],
})
export class LoginOptionsComponent implements OnInit {
  public show: boolean = false;
  public loginOptionsContent: Type<LoginOptionsContentComponent> =
    LoginOptionsContentComponent;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.loginRequests().subscribe({
      next: (state: 'OPEN' | 'CLOSE') => {
        this.show = state === 'OPEN';
      },
    });
  }

  handleClose(): void {
    this.show = false;
  }
}
