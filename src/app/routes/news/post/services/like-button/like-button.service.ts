import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { PostService } from '../post/post.service';

@Injectable({
  providedIn: 'root',
})
export class LikeButtonService {
  private localStoragePostPrefix: string = 'LP';

  constructor(
    private angularFirestore: AngularFirestore,
    private localStorageService: LocalStorageService,
    private postService: PostService
  ) {}

  /* istanbul ignore next */
  updateLikedNumber(postId: string, updatedValue: number): void {
    this.angularFirestore
      .collection('posts')
      .doc(postId)
      .update({ likedBy: updatedValue });
  }

  getLikedNumber(postId: string): Observable<IAnnouncementPost[]> {
    return this.postService.getPost(postId);
  }

  storeLikedPost(postId: string): void {
    const likedPosts: string[] = JSON.parse(
      this.localStorageService.get(this.localStoragePostPrefix) ?? '[]'
    );
    if (likedPosts.includes(postId)) return;
    likedPosts.push(postId);
    this.localStorageService.save(
      this.localStoragePostPrefix,
      JSON.stringify(likedPosts)
    );
  }

  removeLikedPost(postId: string): void {
    const likedPosts: string[] = JSON.parse(
      this.localStorageService.get(this.localStoragePostPrefix) ?? '[]'
    );
    if (!likedPosts.includes(postId)) return;
    _.pull(likedPosts, postId);
    this.localStorageService.save(
      this.localStoragePostPrefix,
      JSON.stringify(likedPosts)
    );
  }

  postIsLiked(postId: string): boolean {
    return JSON.parse(
      this.localStorageService.get(this.localStoragePostPrefix) ?? '[]'
    ).includes(postId);
  }
}
