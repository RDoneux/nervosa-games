import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { v4 } from 'uuid';
import {addWeeks} from 'date-fns'
@Component({
  selector: 'app-playpen',
  templateUrl: './playpen.component.html',
  styleUrls: ['./playpen.component.scss'],
})
export class PlaypenComponent {
  // public testValues = {
  //   text: '',
  //   dropdown: '',
  //   checkbox: '',
  //   radio: '',
  //   radioGroup: '',
  //   checkboxGroup: {
  //     one: false,
  //     two: false,
  //     three: false,
  //     four: false,
  //   },
  //   textArea: ''
  // };

  // announcementPost!: IAnnouncementPost;
  // constructor(private firestore: AngularFirestore) {
  //   firestore
  //     .collection('posts')
  //     .valueChanges()
  //     .subscribe({
  //       next: (value) => {
  //         this.announcementPost = value[0] as IAnnouncementPost;
  //       },
  //     });
  // }

  public testProduct: IProduct = {
    title: 'Test Product',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nervosa-games.appspot.com/o/site-product-images%2Fwarhammer.png?alt=media&token=fa58135d-c0ee-472d-9c53-276027afe8a6',
    imageDescription:
      'Nisi officia duis eiusmod anim quis est reprehenderit aliquip id consectetur in Lorem fugiat ut.',
    itemNumber: 5,
    price: 12.89,
    id: v4(),
    tags: ['starter-kit'],
    dateUploaded: Timestamp.fromDate(addWeeks(new Date(), -3)),
  };

  public testProductNotNew: IProduct = {
    title: 'Test Product',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nervosa-games.appspot.com/o/site-product-images%2Fwarhammer.png?alt=media&token=fa58135d-c0ee-472d-9c53-276027afe8a6',
    imageDescription:
      'Nisi officia duis eiusmod anim quis est reprehenderit aliquip id consectetur in Lorem fugiat ut.',
    itemNumber: 5,
    price: 12.89,
    id: v4(),
    tags: ['starter-kit'],
    dateUploaded: Timestamp.fromDate(addWeeks(new Date(), -1)),
  };
}
