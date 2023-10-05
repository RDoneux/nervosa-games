import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public posts!: IAnnouncementPost[];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore
      .collection('posts', (ref) => ref.orderBy('timestamp', 'desc'))
      .valueChanges()
      .subscribe({
        next: (posts) => {
          this.posts = posts as IAnnouncementPost[];
        },
      });
  }
}
