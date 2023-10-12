import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firebase: AngularFirestore) {}

  /**
   * @description uses passed postId to fetch the target post from DB
   * @param postId: string
   */
  /* istanbul ignore next */
  getPost(postId: string): Observable<IAnnouncementPost[]> {
    return this.firebase
      .collection<IAnnouncementPost>('posts', (ref) =>
        ref.where('id', '==', postId)
      )
      .valueChanges();
  }

  /* istanbul ignore next */
  getUser(userEmail: string): Observable<IUser[]> {
    return this.firebase
      .collection<IUser>('users', (ref) => ref.where('email', '==', userEmail))
      .valueChanges();
  }

  /* istanbul ignore next */
  updateSeenBy(postId: string, value: number): void {
    this.firebase.collection('posts').doc(postId).update({ seenBy: value });
  }
}
