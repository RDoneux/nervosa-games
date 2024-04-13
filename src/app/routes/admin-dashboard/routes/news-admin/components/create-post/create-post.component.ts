import { Component, OnInit, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { v4 } from 'uuid';
import { CreatePostService } from '../../services/create-post.service';
import { RichTextInputComponent } from 'src/app/components/rich-text-input/rich-text-input.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { IPostMode } from '../../interfaces/i-post-mode';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { NotificationType } from 'src/app/modules/notification/interfaces/i-notification';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @ViewChild('postSubtitle')
  private _postSubtitle!: RichTextInputComponent;
  public get postSubtitle(): RichTextInputComponent {
    return this._postSubtitle;
  }

  @ViewChild('postContent')
  private _postContent!: RichTextInputComponent;
  public get postContent(): RichTextInputComponent {
    return this._postContent;
  }

  public mode: IPostMode = IPostMode.CREATE;

  constructor(
    private loginService: LoginService,
    private createPostService: CreatePostService,
    private firestoreService: FirestoreService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  public post: IAnnouncementPost = {
    id: v4(),
    seenBy: 0,
    likedBy: 0,
    posterId: '',
    timestamp: Timestamp.now(),
    title: '',
    subTitle: '',
    subTitlePlainText: '',
    content: '',
    tags: [],
    comments: [],
    backgroundImageAlt: '',
    backgroundImageUrl: '',
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (queryParams: Params) => {
        if (queryParams['id']) {
          this.fetchPost(queryParams['id']);
          this.mode = IPostMode.EDIT;
        }
      },
      error: (error: any) => console.log(error),
    });
  }

  fetchPost(id: string): void {
    this.firestoreService
      .getFirestore()
      .collection('posts')
      .doc<IAnnouncementPost>(id)
      .valueChanges()
      .subscribe(
        (response: IAnnouncementPost | undefined) => (
          (this.post = response ?? this.post),
          this.postSubtitle.setContent(this.post.subTitle),
          this.postContent.setContent(this.post.content),
          console.log(this.post)
        )
      );
  }

  addDownloadUrl(url: string): void {
    this.post.backgroundImageUrl = url;
  }

  removeTitleImage(): void {
    this.post.backgroundImageAlt = '';
    this.post.backgroundImageUrl = '';
  }

  onSubmit(): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {

        // if no user is returned, show notification and break
        if (!user) {
          this.notificationService.showNotification(
            'Invalid User - cannot create post',
            'danger',
            3000
          );
          return;
        }

        this.post.posterId = user?.email ?? 'INVALID';
        this.post.timestamp = Timestamp.now();
        this.post.subTitle = this.postSubtitle.getContent();
        this.post.subTitlePlainText = this.postSubtitle.getPlainTextContent();
        this.post.content = this.postContent.getContent();

        this.createPostService.uploadPost(this.post);
      },
    });

    this.router.navigateByUrl(
      `news/post?${new HttpParams().set('id', this.post.id)}`
    );
  }

  areYouSure(): void {
    this.notificationService.askBinaryQuestion('Delete Post?').subscribe({
      next: (response: boolean) => {
        if (response) this.createPostService.deletePost(this.post.id);
        this.notificationService.showNotification(
          'Post successfully deleted',
          NotificationType.SUCCESS,
          3000
        );
        this.router.navigateByUrl('news');
      },
      error: (error: any) =>
        this.notificationService.showNotification(
          `Error deleting post. Please try again later ${error}`,
          NotificationType.DANGER,
          3000
        ),
    });
  }
}
