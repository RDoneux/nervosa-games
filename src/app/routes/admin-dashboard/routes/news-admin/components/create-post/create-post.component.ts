import { Component } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {

  constructor(private loginService: LoginService){}

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

  onSubmit(): void {
    this.loginService.getCurrentLoggedInUser().subscribe({
      next: () => {
        this.post.timestamp = Timestamp.now();

      }
    })
    
  }
}
