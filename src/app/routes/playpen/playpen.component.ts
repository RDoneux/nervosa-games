import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IAnnouncementPost } from 'src/app/components/announcment-post/interfaces/i-announcement-post.interface';
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

  announcementPost!: IAnnouncementPost;
  constructor(private firestore: AngularFirestore) {
    firestore
      .collection('posts')
      .valueChanges()
      .subscribe({
        next: (value) => {
          this.announcementPost = value[0] as IAnnouncementPost;
        },
      });
  }
}
