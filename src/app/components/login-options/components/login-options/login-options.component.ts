import { Component, OnInit, Type } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { LoginOptionsContentComponent } from '../login-options-content/login-options-content.component';

@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.component.html',
  styleUrls: ['./login-options.component.scss'],
})
export class LoginOptionsComponent implements OnInit {
  public show: boolean = false;
  public loginOptionsContent: Type<LoginOptionsContentComponent> =
    LoginOptionsContentComponent;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getStreams$(['login']).subscribe({
      next: () => {
        this.show = true;
      },
    });
  }

  handleClose(): void {
    this.show = false;
  }
}
