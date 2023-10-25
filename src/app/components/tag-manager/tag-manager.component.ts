import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, UserInterfaceModule],
  templateUrl: './tag-manager.component.html',
  styleUrls: ['./tag-manager.component.scss'],
})
export class TagManagerComponent {
  @Input() label: string = 'Tag Manager';
  @Input() tags: string[] = [];

  @Output() tagsChanged: EventEmitter<string[]> = new EventEmitter();

  public tagDraft: string = '';

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    if (event.key != 'Enter' || this.tagDraft.length === 0) return;
    event.preventDefault();
    this.addTag(this.tagDraft);
  }

  addTag(tag: string): void {
    this.tags.push(tag.toLowerCase());
    this.tagDraft = '';
    this.tagsChanged.emit(this.tags);
  }

  removeTag(tag: string): void {
    this.tags = this.tags.filter((tagFromList: string) => tagFromList !== tag);
  }
}
