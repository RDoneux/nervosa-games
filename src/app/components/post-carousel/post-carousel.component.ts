import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IAnnouncementPost } from '../announcment-post/interfaces/i-announcement-post.interface';
import { AnnouncmentPostComponent } from '../announcment-post/components/announcment-post.component';
import { IUser } from 'src/app/interfaces/i-user.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { debug } from 'src/app/services/debug/debug';

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
  public currentDateTime = new Date().getTime() / 1000;
  public currentLoggedInUser!: IUser | null;

  public posts!: IAnnouncementPost[];
  public offsetX: number = 0;

  constructor(
    private firebase: AngularFirestore,
    private loginService: LoginService
  ) {}

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

    if (window.innerWidth > 576)
      setInterval(() => this.incrementCarousel(), this.advanceTimeIncrement);

    this.loginService.getCurrentLoggedInUser().subscribe({
      next: (user: IUser | null) => (this.currentLoggedInUser = user),
      error: (error: any) => debug('error')(error),
    });
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
