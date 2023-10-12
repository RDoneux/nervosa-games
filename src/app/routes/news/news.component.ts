import { Component, OnInit } from '@angular/core';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public posts!: IAnnouncementPost[];

  constructor(private firestoreService: FirestoreService) {}

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
  }
}
