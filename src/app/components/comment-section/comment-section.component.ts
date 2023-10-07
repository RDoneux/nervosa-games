import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from 'src/app/interfaces/i-comment.interface';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { GoogleSignInService } from 'src/app/services/auth/google/google-sign-in.service';
import { IUser } from 'src/app/interfaces/i-user.interface';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, UserInterfaceModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent implements OnInit {
  @Input() existingComments!: IComment[];

  constructor(private googleSignIn: GoogleSignInService) {}

  ngOnInit(): void {
    // this.googleSignIn.signInWithPopup().subscribe({
    //   next: (result: IUser) => {
    //     console.log(result);
    //   },
    // });
  }
}
