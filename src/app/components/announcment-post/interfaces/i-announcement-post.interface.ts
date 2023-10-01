import { IComment } from 'src/app/interfaces/i-comment.interface';

export interface IAnnouncementPost {
  id: string;

  seenBy: number;
  likedBy: number;
  posterId: string;
  date: Date;

  title: string;
  content: string;

  backgroundImageUrl: string;
  backgroundImageAlt: string;

  comments: IComment[];
}
