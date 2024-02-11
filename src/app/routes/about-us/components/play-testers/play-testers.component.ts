import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IAboutUsPlayTesters } from '../../interfaces/i-about-us-play-testers';

@Component({
  selector: 'app-play-testers',
  templateUrl: './play-testers.component.html',
  styleUrl: './play-testers.component.scss',
})
export class PlayTestersComponent implements AfterViewInit {
  @Input({ required: true }) playTesters!: IAboutUsPlayTesters;

  @ViewChildren('playTester') playTesterElements!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    console.log('after view init');

    this.playTesterElements.changes.subscribe({
      next: (children: ElementRef[]) => {
        setInterval(() => {
          children.forEach((child: ElementRef) => {

            if(child.nativeElement.style.left === "") {
              child.nativeElement.style.left = 0;
            }

            child.nativeElement.style.left = (child.nativeElement.style.left - 1);

            // setInterval(() => {
            //   console.log(child.nativeElement.style.left)
            //   child.nativeElement.style.left = '-50px';
            // }, 100)

            console.log(child.nativeElement.style.left);
          });
        });
      },
    });

    // this.playTesterElements.forEach((tester) => {
    //   tester.nativeElement.style.left = 0;
    //   console.log('setting', tester.nativeElement.style.left);
    // });

    // setInterval(() => {
    //   this.playTesterElements.forEach((tester: ElementRef) => {
    //     console.log(tester.nativeElement.style.left);
    //     tester.nativeElement.style.left = tester.nativeElement.style.left - 2;
    //   });
    // }, 100);
  }
}
