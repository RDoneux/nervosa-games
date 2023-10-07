import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { PostService } from './services/post/post.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post!: IAnnouncementPost;
  public user!: IUser;

  private postSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // get the post id from query params
    this.route.queryParams.subscribe({
      next: (value: any) => this.fetchPost(value),
    });
  }

  public requestLogin(): void {
    this.messageService.send({
      stream: 'login',
      sender: this.constructor.name,
      payload: 'login request',
    });
  }

  private fetchPost(value: any): void {
    this.postSubscription = this.postService.getPost(value['id']).subscribe({
      next: (post: IAnnouncementPost[]) => {
        this.post = post[0];
        this.fetchUser(post[0].posterId);
        this.updateSeenBy(post[0].id, post[0].seenBy);
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
    this.postSubscription?.unsubscribe();
  }
}
