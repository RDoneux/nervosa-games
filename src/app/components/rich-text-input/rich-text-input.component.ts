import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Quill from 'quill';
import { finalize } from 'rxjs';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';

@Component({
  selector: 'app-rich-text-input',
  standalone: true,
  imports: [],
  templateUrl: './rich-text-input.component.html',
  styleUrl: './rich-text-input.component.scss',
})
export class RichTextInputComponent implements AfterViewInit {
  @Input() placeholder!: string;
  @Input() text: string = '{}'; // Delta object stringified
  @Input() mode: 'edit' | 'display' = 'edit';

  private readonly DB_DIRECTORY: string = 'post-images';
  private readonly LOADING_ANIMATION_PATH: string =
    'assets/icons/loading-animation.gif';
  private quillInput!: Quill;

  @ViewChild('content')
  private _content!: ElementRef;
  public get content(): HTMLDivElement {
    return this._content.nativeElement;
  }

  constructor(private storageService: StorageService) {}

  ngAfterViewInit(): void {
    let options: any = {
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
    if (this.mode === 'edit') {
      this.quillInput
        .getModule('toolbar')
        .addHandler('image', () => this.imageUploaded());
    }
    if (this.mode === 'display') this.quillInput.disable();
  }

  getContent(): string {
    return JSON.stringify(this.quillInput.getContents());
  }

  // IMAGE UPLOAD TO SERVER LOGIC //

  private imageUploaded(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // // Listen upload local image and save to server
    input.onchange = () => {
      if (!input.files) return;
      const file = input.files[0];
      // only allow image uploads.
      if (/^image\//.test(file.type)) {
        this.saveToFirebase(file);
      } else {
        console.warn('You could only upload images.');
      }
    };
  }

  private saveToFirebase(file: File): void {
    this.insertLoadingAnimation();

    const randomId = Math.random().toString(36).substring(2);
    const ref = this.storageService
      .getStorage()
      .ref(`${this.DB_DIRECTORY}/${randomId}`);

    const task = ref.put(file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            this.insertToEditor(url);
          });
        })
      )
      .subscribe();
  }

  private loadingAnimationLocation!: number;
  private insertLoadingAnimation(): void {
    const range = this.quillInput.getSelection();
    if (!range) return;
    this.loadingAnimationLocation = range.index;
    this.quillInput.insertEmbed(
      range.index,
      'image',
      this.LOADING_ANIMATION_PATH
    );
  }

  private insertToEditor(url: string) {
    // push image url to rich editor.
    const range = this.quillInput.getSelection();
    if (!range) return;
    this.quillInput.deleteText(this.loadingAnimationLocation, 1); // remove the loading animation
    this.quillInput.insertEmbed(range.index, 'image', url);
  }
}
