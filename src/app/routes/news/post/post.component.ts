import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { PostService } from './services/post/post.service';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login/login.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public post!: IAnnouncementPost;
  public user!: IUser | null;

  public currentLoggedInUser: IUser | null = null;

  private postSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {
        this.currentLoggedInUser = user;
      },
      error: (error: any) => console.log(error)
    });

    // get the post id from query params
    this.route.queryParams.subscribe({
      next: (value: any) => this.fetchPost(value),
    });
  }

  public editPost(): void {
    this.router.navigateByUrl(`/admin-dashboard/news-admin?${new HttpParams().set('id', this.post.id)}`)
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
