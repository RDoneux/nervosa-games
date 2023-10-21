import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
import { IProduct } from 'src/app/components/product/interfaces/i-product.interface';
import { v4 } from 'uuid';
import { addWeeks } from 'date-fns';
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

  public likedTestProduct: IProduct = {
    title: 'Test Product',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nervosa-games.appspot.com/o/site-product-images%2Fwarhammer.png?alt=media&token=fa58135d-c0ee-472d-9c53-276027afe8a6',
    imageDescription:
      'Nisi officia duis eiusmod anim quis est reprehenderit aliquip id consectetur in Lorem fugiat ut.',
    itemNumber: 5,
    price: 12.89,
    id: 'f5ce60ca-28a2-4078-b324-a477a6d82a5e',
    tags: ['starter-kit'],
    dateUploaded: Timestamp.fromDate(addWeeks(new Date(), -3)),
    description:
      'Deserunt aute ea do occaecat enim eu adipisicing excepteur aute id voluptate. Nisi fugiat esse reprehenderit consectetur nisi irure nulla esse irure eu quis aliquip. Aliquip non consequat aliquip labore. Mollit voluptate magna laborum quis cupidatat cupidatat enim aute in excepteur aliquip et mollit.',
  };

  public testProduct: IProduct = {
    title: 'Test Product',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nervosa-games.appspot.com/o/site-product-images%2Fwarhammer.png?alt=media&token=fa58135d-c0ee-472d-9c53-276027afe8a6',
    imageDescription:
      'Nisi officia duis eiusmod anim quis est reprehenderit aliquip id consectetur in Lorem fugiat ut.',
    itemNumber: 5,
    price: 12.89,
    id: '247a13cf-abdb-480e-89d8-5ca602d474f2',
    tags: ['starter-kit'],
    dateUploaded: Timestamp.fromDate(addWeeks(new Date(), -3)),
    description:
      'Deserunt aute ea do occaecat enim eu adipisicing excepteur aute id voluptate. Nisi fugiat esse reprehenderit consectetur nisi irure nulla esse irure eu quis aliquip. Aliquip non consequat aliquip labore. Mollit voluptate magna laborum quis cupidatat cupidatat enim aute in excepteur aliquip et mollit.',
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
    description: `Deserunt tempor nostrud nulla amet id sit mollit sunt. Dolor ullamco cupidatat incididunt adipisicing sit fugiat ut nulla. Veniam fugiat officia est et nisi reprehenderit duis ullamco mollit dolore eu do. Quis Lorem et laborum magna pariatur. Duis fugiat consectetur non sint labore eu ad veniam exercitation commodo consectetur quis veniam.

Sint ex ullamco sunt dolor aliquip elit. Ut aliquip nisi commodo eu ullamco id eiusmod officia aute sunt cupidatat minim ea. Ullamco do in pariatur sint elit nostrud ex laboris nisi duis. Nisi ea amet officia excepteur consequat aliquip sit. Commodo aliquip duis sint id pariatur in sunt incididunt ut nulla esse consequat culpa ad.

Ad enim cupidatat labore aute esse sit ut magna qui qui aliqua ullamco amet laboris. Aliqua est excepteur ad Lorem aliquip aliqua sunt officia ex. Aute magna occaecat veniam quis labore voluptate eiusmod id pariatur reprehenderit consequat esse irure. Mollit qui ullamco consequat eiusmod. Fugiat sit culpa amet laboris. Nostrud ullamco reprehenderit irure est cupidatat tempor voluptate anim tempor enim qui dolor nostrud officia. Ex cupidatat dolor ea culpa fugiat cillum officia Lorem non eiusmod exercitation.`,
  };
}
