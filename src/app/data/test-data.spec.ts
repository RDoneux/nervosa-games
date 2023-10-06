import { IAnnouncementPost } from '../components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from '../interfaces/i-user.interface';

export const mockedAnnouncementPost: IAnnouncementPost = {
  id: 'test-id',
  seenBy: 1,
  likedBy: 2,
  posterId: 'test-poster-id',
  timestamp: new Date(),
  title: 'test-title',
  backgroundImageAlt: 'test-alt-background',
  backgroundImageUrl: 'test-background-url',
  content: 'test-content',
  subTitle: 'test-subtitle',
  tags: ['test-tag-one', 'test-tag-two'],
  comments: [{ userId: 'test-user-id', comment: 'test-comment' }],
};

export const mockedUser: IUser = {
  firstName: 'mock-user-first-name',
  lastName: 'mock-user-last-name',
  isAdmin: false,
  id: 'mock-user-id',
};