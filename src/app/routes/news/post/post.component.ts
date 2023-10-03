import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post!: IAnnouncementPost;

  constructor(
    private route: ActivatedRoute,
    private firebase: AngularFirestore
  ) {}

  ngOnInit(): void {
    // get the post id from query params
    this.route.queryParams.subscribe({
      next: (value: any) => this.getPost(value['id']),
    });
  }

  /**
   * @description uses passed postId to fetch the target post from DB
   * @param postId: string
   */
  /* istanbul ignore next */
  getPost(postId: string): void {
    this.firebase
      .collection('posts', (ref) => ref.where('id', '==', postId))
      .valueChanges()
      .subscribe({
        next: (post: unknown) => {
          this.post = post as IAnnouncementPost;
        },
      });
  }
}
