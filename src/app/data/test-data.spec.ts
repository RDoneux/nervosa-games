import { Timestamp } from '@angular/fire/firestore';
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
  comments: [
    {
      userDisplayName: 'test-user-display-name',
      userImageUrl: 'test-user-image-url',
      datePosted: Timestamp.now(),
      comment: 'test-comment',
      likedBy: 1,
    },
  ],
};

export const mockedUser: IUser = {
  displayName: 'mock-user-display-name',
  profilePicture: 'mock-user-profile-picture',
  isAdmin: false,
  id: 'mock-user-id',
  email: 'test-user-email',
};
