import { IComment } from 'src/app/interfaces/i-comment.interface';

export interface IAnnouncementPost {
  id: string;

  seenBy: number;
  likedBy: number;
  posterId: string;
  timestamp: any;

  title: string;
  subTitle: string;
  subTitlePlainText: string;
  content: string;

  tags: string[];

  backgroundImageUrl: string;
  backgroundImageAlt: string;

  comments: IComment[];
}
