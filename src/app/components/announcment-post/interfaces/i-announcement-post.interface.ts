import { IComment } from 'src/app/interfaces/i-comment.interface';
import { ITag } from '../../tags-input/interfaces/i-tag.interface';

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

  tags: ITag[];

  backgroundImageUrl: string;
  backgroundImageAlt: string;

  comments: IComment[];

  postDate: any;
}
