import {
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public user: IUser | null = null;

  @ViewChild('container')
  private _componentContainer!: ElementRef;
  public get componentContainer(): HTMLDivElement {
    return this._componentContainer.nativeElement;
  }
  @ContentChild(TemplateRef) signOut!: TemplateRef<HTMLDivElement>;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => (this.user = user),
    });
  }

  onSignIn(): void {
    this.loginService.requestUserLogsIn().subscribe({
      next: (user: IUser | null) => (this.user = user),
    });
  }

  onSignOut(): void {
    this.loginService.requestLogout();
  }
}
