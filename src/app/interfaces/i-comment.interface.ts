import { Timestamp } from '@angular/fire/firestore';

export interface IComment {
  userDisplayName: string;
  userImageUrl: string | null;
  comment: string;
  likedBy: number;
  datePosted: Timestamp;
}
