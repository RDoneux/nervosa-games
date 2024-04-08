import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from '../components/announcment-post/interfaces/i-announcement-post.interface';
import { IUser } from '../interfaces/i-user.interface';
import { IComment } from '../interfaces/i-comment.interface';
import { RouterStateSnapshot } from '@angular/router';
import { IProduct } from '../components/product/interfaces/i-product.interface';
import { ICartItem } from '../interfaces/i-cart-item.interface';

export function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

export const mockedComment: IComment = {
  userDisplayName: 'test-user-display-name',
  userImageUrl: 'test-user-image-url',
  datePosted: Timestamp.now(),
  comment: 'test-comment',
  likedBy: 1,
};

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
  subTitlePlainText: 'test-subtitle-plain-text',
  tags: ['test-tag-one', 'test-tag-two'],
  comments: [mockedComment],
};

export const mockedUser: IUser = {
  displayName: 'mock-user-display-name',
  profilePicture: 'mock-user-profile-picture',
  isAdmin: false,
  id: 'mock-user-id',
  email: 'test-user-email',
  likedProducts: ['liked-product-one', 'liked-product-two'],
};

export const mockedProduct: IProduct = {
  imageDescription: 'test-product-image-description',
  imageUrl: 'test-product-image-url',
  title: 'test-product-title',
  searchTitle: 'test-search-title',
  itemNumber: 1,
  price: 2,
  id: 'test-product-id',
  tags: ['test-tag-one', 'test-tag-two'],
  dateUploaded: Timestamp.now(),
  description: 'test-product-description',
  isLiked: false,
  type: 'minature',
};

export const mockedCartItem: ICartItem = { ...mockedProduct, quantity: 1 };
