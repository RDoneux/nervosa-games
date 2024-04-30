import { Component, OnInit } from '@angular/core';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { LoginService } from 'src/app/services/login/login.service';
import { debug } from 'src/app/services/debug/debug';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public posts!: IAnnouncementPost[];

  public currentDateTime = new Date().getTime() / 1000;
  public currentLoggedInUser!: IUser | null;

  constructor(
    private firestoreService: FirestoreService,
    private loginService: LoginService
  ) {}

  /* istanbul ignore next */
  ngOnInit(): void {
    this.firestoreService
      .getFirestore()
      .collection<IAnnouncementPost>('posts', (ref) =>
        ref.orderBy('timestamp', 'desc')
      )
      .valueChanges()
      .subscribe({
        next: (posts: IAnnouncementPost[]) => (this.posts = posts),
      });

    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => (this.currentLoggedInUser = user),
      error: (error: any) => debug('error')(error),
    });
  }
}
