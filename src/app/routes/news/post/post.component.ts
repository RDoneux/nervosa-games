import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { PostService } from './services/post/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post!: IAnnouncementPost;
  public user!: IUser;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // get the post id from query params
    this.route.queryParams.subscribe({
      next: (value: any) => this.fetchPost(value),
    });
  }

  private fetchPost(value: any): void {
    const postSubscription: Subscription = this.postService
      .getPost(value['id'])
      .subscribe({
        next: (post: IAnnouncementPost[]) => {
          this.post = post[0];
          this.fetchUser(post[0].posterId);
          this.updateSeenBy(post[0].id, post[0].seenBy);
          postSubscription.unsubscribe();
        },
      });
  }

  private fetchUser(posterId: string): void {
    this.postService.getUser(posterId).subscribe({
      next: (user: IUser[]) => {
        this.user = user[0];
      },
    });
  }

  private updateSeenBy(postId: string, currentSeenByValue: number): void {
    this.postService.updateSeenBy(postId, currentSeenByValue + 1);
  }
}
