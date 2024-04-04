import {
  Component,
  ViewChild,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { v4 } from 'uuid';
import { CreatePostService } from '../../services/create-post.service';
import { RichTextInputComponent } from 'src/app/components/rich-text-input/rich-text-input.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
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

  constructor(
    private loginService: LoginService,
    private createPostService: CreatePostService
  ) {}

  post: IAnnouncementPost = {
    id: v4(),
    seenBy: 0,
    likedBy: 0,
    posterId: '',
    timestamp: Timestamp.now(),
    title: '',
    subTitle: '',
    content: '',
    tags: [],
    comments: [],
    backgroundImageAlt: '',
    backgroundImageUrl: '',
  };

  addDownloadUrl(url: string): void {
    this.post.backgroundImageUrl = url;
  }

  onSubmit(): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => {
        this.post.posterId = user?.email ?? 'INVALID';
        this.post.timestamp = Timestamp.now();
        this.post.subTitle = this.postSubtitle.getContent();
        this.post.content = this.postContent.getContent();
        this.createPostService.uploadPost(this.post);
      },
    });
  }
}
