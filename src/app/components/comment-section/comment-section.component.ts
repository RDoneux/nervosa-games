import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IComment } from 'src/app/interfaces/i-comment.interface';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, UserInterfaceModule],
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input() existingComments!: IComment[];

  ngOnInit(): void {


    

  }

}
