import { Timestamp } from '@angular/fire/firestore';

export interface IProduct {
  imageUrl: string;
  imageDescription: string;
  title: string;
  itemNumber: number;
  price: number;
  id: string;
  tags: string[];
  dateUploaded: Timestamp;
}
