import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInterfaceModule } from 'src/app/modules/user-interface/user-interface.module';
import { ITag } from './interfaces/i-tag.interface';
import { v4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { ITagMode } from './interfaces/i-tag-mode.interface';

@Component({
  selector: 'app-tags-input',
  standalone: true,
  imports: [UserInterfaceModule, FormsModule],
  templateUrl: './tags-input.component.html',
  styleUrl: './tags-input.component.scss',
})
export class TagsInputComponent {
  @Input() tags!: ITag[];
  @Input() mode: ITagMode = ITagMode.DISPLAY;
  @Input() multiple: boolean = false;
  @Output() tagsChange: EventEmitter<ITag[]> = new EventEmitter();

  public tagInput: string = '';

  addTag(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.tagInput || this.mode === ITagMode.DISPLAY) return;
    this.tags.push({ label: this.tagInput, id: v4(), selected: false });
    this.tagInput = '';
  }

  handleTagClick(tag: ITag): void {
    if (tag.selected === true) return;
    tag.selected = true;
    this.tagsChange.emit(this.tags);
  }

  tagXClicked(tag: ITag): void {
    if (this.mode === ITagMode.EDIT) {
      this.removeTag(tag.id);
      this.tagsChange.emit(this.tags);
    } else {
      tag.selected = false;

      this.tagsChange.emit(this.tags);
    }
  }

  private removeTag(id: string): void {
    this.tags = this.tags.filter((tag: ITag) => tag.id !== id);
  }
}
