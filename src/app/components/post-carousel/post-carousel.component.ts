import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IAnnouncementPost } from '../announcment-post/interfaces/i-announcement-post.interface';
import { AnnouncmentPostComponent } from '../announcment-post/components/announcment-post.component';

@Component({
  selector: 'app-post-carousel',
  standalone: true,
  imports: [CommonModule, AnnouncmentPostComponent],
  templateUrl: './post-carousel.component.html',
  styleUrls: ['./post-carousel.component.scss'],
})
export class PostCarouselComponent implements OnInit {
  @Input() advanceTimeIncrement: number = 10000;

  @ViewChild('postCarouselContainer')
  private _carouselContainer!: ElementRef;
  /* istanbul ignore next */
  public get carouselContainer(): HTMLDivElement {
    return this._carouselContainer.nativeElement;
  }

  public posts!: IAnnouncementPost[];
  public offsetX: number = 0;

  constructor(private firebase: AngularFirestore) {}

  /* istanbul ignore next */
  ngOnInit(): void {
    this.firebase
      .collection('posts', (ref) => ref.orderBy('timestamp', 'desc').limit(10))
      .valueChanges()
      .subscribe({
        next: (value) => {
          this.posts = value as IAnnouncementPost[];
        },
      });

    setInterval(() => this.incrementCarousel(), this.advanceTimeIncrement);
  }

  incrementCarousel(): void {
    if (
      this.offsetX <=
      -(this.posts.length - 3) * (this.carouselContainer.offsetWidth / 3)
    ) {
      this.offsetX = 0;
      return;
    }
    this.offsetX -= this.carouselContainer.offsetWidth / 3;
  }
}
