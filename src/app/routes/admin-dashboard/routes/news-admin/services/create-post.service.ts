import { Injectable } from '@angular/core';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  constructor(private angularFirestoreService: FirestoreService) {}

  uploadPost(post: IAnnouncementPost): void {
    this.angularFirestoreService
      .getFirestore()
      .doc(`posts/${post.id}`)
      .set(post);
  }
}
