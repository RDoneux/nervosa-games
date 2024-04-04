import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Quill from 'quill';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-rich-text-input',
  standalone: true,
  imports: [],
  templateUrl: './rich-text-input.component.html',
  styleUrl: './rich-text-input.component.scss',
})
export class RichTextInputComponent implements AfterViewInit {
  @Input() placeholder!: string;
  @Input() text!: string; // Delta object stringified
  @Input() mode: 'edit' | 'display' = 'edit';

  @ViewChild('content')
  private _content!: ElementRef;
  public get content(): HTMLDivElement {
    return this._content.nativeElement;
  }

  private quillInput!: Quill;

  constructor(private utilsService: UtilsService) {}

  ngAfterViewInit(): void {
    let options: any = {
      debug: this.utilsService.isDevMode() ? 'log' : 'warn',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          [{ font: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
        ],
      },
      placeholder: this.placeholder,
      theme: 'snow',
    };

    if (this.mode === 'display') options = {};

    this.quillInput = new Quill(this.content, options);
    this.quillInput.setContents(JSON.parse(this.text));
    if (this.mode === 'display') this.quillInput.disable();
  }

  getContent(): string {
    return JSON.stringify(this.quillInput.getContents());
  }
}
