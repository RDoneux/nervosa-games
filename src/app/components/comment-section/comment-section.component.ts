import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from 'src/app/interfaces/i-comment.interface';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { Timestamp, arrayUnion } from '@angular/fire/firestore';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { IAnnouncementPost } from '../announcment-post/interfaces/i-announcement-post.interface';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, UserInterfaceModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input({ required: true }) postId!: string;
  @Input({ required: true }) user!: IUser | null;

  public existingComments!: IComment[];

  public newComment!: IComment;
  public hasFocus: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private loginService: LoginService
  ) {}

  /* istanbul ignore next */
  ngOnInit(): void {
    this.newComment = {
      comment: '',
      likedBy: 0,
      userDisplayName: this.user?.displayName ?? 'unknown',
      userImageUrl: this.user?.profilePicture ?? '',
      datePosted: new Timestamp(0, 0),
    };

    this.firestoreService
      .getFirestore()
      .collection<IAnnouncementPost>('posts', (ref) =>
        ref.where('id', '==', this.postId)
      )
      .valueChanges()
      .subscribe({
        next: (value: IAnnouncementPost[]) => {
          this.existingComments = this.sortData(value[0].comments);
        },
      });
  }

  sortData(comments: IComment[]): IComment[] {
    return comments.sort((a: IComment, b: IComment) =>
      a.datePosted > b.datePosted ? -1 : 1
    );
  }

  onFocus(): void {
    this.hasFocus = true;
    this.loginService.requestUserLogsIn().subscribe({
      next: (response: IUser | null) => {
        this.user = response;
      },
    });
  }

  /* istanbul ignore next */
  onPublish(): void {
    if (!this.user) {
      this.onFocus();
      return;
    }

    this.newComment.userDisplayName = this.user.displayName;
    this.newComment.userImageUrl = this.user.profilePicture;
    this.newComment.datePosted = Timestamp.now();
    this.firestoreService
      .getFirestore()
      .doc('posts/' + this.postId)
      .update({ comments: arrayUnion(this.newComment) });
    this.newComment.comment = '';
  }

  onCancel(): void {
    this.newComment.comment = '';
  }
}
