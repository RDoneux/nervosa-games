import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { v4 } from 'uuid';
import { CreatePostService } from '../../services/create-post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
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
        this.createPostService.uploadPost(this.post);
      },
    });
  }
}
