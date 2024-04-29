import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAnnouncementPost } from '../interfaces/i-announcement-post.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-announcment-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './announcment-post.component.html',
  styleUrls: ['./announcment-post.component.scss'],
})
export class AnnouncmentPostComponent implements AfterViewInit {
  @Input({ required: true }) announcementPost!: IAnnouncementPost;

  public poster!: IUser;
  public linkBase: string = '/news/post';
  public currentDateTime = new Date().getTime() / 1000;
  public currentUser!: IUser | null

  constructor(
    private firebase: AngularFirestore,
    public elementRef: ElementRef,
    private loginService: LoginService
  ) {}

  async ngAfterViewInit(): Promise<void> {

    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => this.currentUser = user
    });

    new Promise<void>(() => {
      const checkForAnnouncementPostToBeDefined = () => {
        this.announcementPost
          ? this.findPosterInformation()
          : setTimeout(checkForAnnouncementPostToBeDefined, 100);
      };
      checkForAnnouncementPostToBeDefined();
    });
  }

  /* istanbul ignore next */
  findPosterInformation(): void {
    this.firebase
      .collection('users', (ref) =>
        ref.where('email', '==', this.announcementPost.posterId)
      )
      .valueChanges()
      .subscribe({
        next: (value) => {
          this.poster = value[0] as IUser;
        },
      });
  }
}
