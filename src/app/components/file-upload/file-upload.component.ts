import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { StorageService } from 'src/app/services/cloud-storage/storage.service';
import { v4 } from 'uuid';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Input({ required: true }) uploadPath!: string;

  @Output() downloadUrl: EventEmitter<string> = new EventEmitter();

  public uniqueId: string = v4();
  public loading: boolean = false;
  public uploadProgress!: any;
  public uploadState!: any;
  public loadedFileName!: string;
  public loadedFileSize!: string;
  public loadingState: 'LOADING' | 'PAUSED' = 'LOADING';

  private ref!: AngularFireStorageReference;
  private task!: AngularFireUploadTask;

  constructor(
    private storageService: StorageService,
    private utilsService: UtilsService
  ) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    console.log('drag enter');
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log('drag leave');
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.onUpload({
      target: { files: event.dataTransfer.files },
    } as unknown as Event);

    console.log('drop');
  }

  ngOnInit(): void {}

  onUpload(event: Event): void {
    this.loading = true;

    const element: HTMLInputElement = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;

    if (!fileList) return;

    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.storageService.getStorage().ref(`test/${randomId}`);

    const targetFile: File = fileList[0];

    this.task = this.ref.put(targetFile);

    this.uploadProgress = this.task.percentageChanges();

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url) => {
            this.downloadUrl.emit(url);
            this.loading = false;
            this.loadedFileName = targetFile.name;
            this.loadedFileSize = this.utilsService.formatFileSize(
              targetFile.size,
              0
            );
          });
        })
      )
      .subscribe();
  }

  onPause(): void {
    this.task.pause();
    this.loadingState = 'PAUSED';
  }

  onResume(): void {
    this.task.resume();
    this.loadingState = 'LOADING';
  }

  onCancel(): void {
    this.task.resume();
  }

  onDelete(): void {
    this.loadedFileName = '';
    this.loadedFileSize = '';
  }
}
