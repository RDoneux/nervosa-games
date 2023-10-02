import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAnnouncementPost } from '../interfaces/i-announcement-post.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { RouterModule } from '@angular/router';

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

  constructor(private firebase: AngularFirestore, public elementRef: ElementRef) {}

  async ngAfterViewInit(): Promise<void> {
    new Promise<void>(() => {
      const checkForAnnouncementPostToBeDefined = () => {
        this.announcementPost
          ? this.findPosterInformation()
          : setTimeout(checkForAnnouncementPostToBeDefined, 100);
      };
      checkForAnnouncementPostToBeDefined();
    });
  }

  findPosterInformation(): void {
    this.firebase
      .collection('users', (ref) =>
        ref.where('id', '==', this.announcementPost.posterId)
      )
      .valueChanges()
      .subscribe({
        next: (value) => {
          this.poster = value[0] as IUser;
        },
      });
  }
}
