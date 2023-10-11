import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from 'src/app/interfaces/i-comment.interface';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp, arrayUnion } from '@angular/fire/firestore';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { IAnnouncementPost } from '../announcment-post/interfaces/i-announcement-post.interface';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule, UserInterfaceModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input({ required: true }) postId!: string;
  @Input({ required: true }) user!: IUser;

  public existingComments!: IComment[];

  public newComment!: IComment;
  public hasFocus: boolean = false;

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.newComment = {
      comment: '',
      likedBy: 0,
      userDisplayName: this.user.displayName,
      userImageUrl: this.user.profilePicture ?? '',
      datePosted: new Timestamp(0, 0),
    };

    this.firestore
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

  onPublish(): void {
    this.newComment.datePosted = Timestamp.now();
    this.firestore
      .doc('posts/' + this.postId)
      .update({ comments: arrayUnion(this.newComment) });
    this.newComment.comment = '';
  }

  onCancel(): void {
    this.newComment.comment = '';
  }
}
