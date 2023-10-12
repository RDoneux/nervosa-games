import { Component, Input, OnInit } from '@angular/core';
import { LikeButtonService } from '../../services/like-button/like-button.service';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent implements OnInit {
  @Input({ required: true }) postId!: string;

  public liked!: boolean;
  public likedBy!: number;

  constructor(private likeButtonService: LikeButtonService) {}

  ngOnInit(): void {
    this.liked = this.likeButtonService.postIsLiked(this.postId);
    this.likeButtonService.getLikedNumber(this.postId).subscribe({
      next: (value: IAnnouncementPost[]) => this.setLikedBy(value[0]),
    });
  }

  setLikedBy(announcementPost: IAnnouncementPost): void {
    this.likedBy = announcementPost.likedBy;
  }

  onLike(): void {
    this.liked = !this.liked;
    this.likeButtonService.updateLikedNumber(
      this.postId,
      this.likedBy + (this.liked ? 1 : -1)
    );
    this.liked
      ? this.likeButtonService.storeLikedPost(this.postId)
      : this.likeButtonService.removeLikedPost(this.postId);
  }
}
