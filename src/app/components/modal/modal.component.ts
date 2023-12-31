import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOut } from 'src/app/animations/fade-in-out.animation';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [fadeInOut],
})
export class ModalComponent implements OnChanges {
  @Input({ required: true }) show!: boolean;
  @Input() component!: Type<unknown>;
  @Input() size: { width: string; height: string } = {
    width: '80vw',
    height: '90vh',
  };

  @Output() closeRequested: EventEmitter<null> = new EventEmitter();

  @ViewChild('modalPage') modalPage!: ElementRef;
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  public orderedViewContainer!: ViewContainerRef;

  @HostListener('click', ['$event'])
  onClickOutsidePage(event: MouseEvent): void {
    if (this.modalPage?.nativeElement.contains(event.target)) return;
    this.requestClose();
  }

  requestClose(): void {
    this.closeRequested.emit();
  }

  async ngOnChanges(): Promise<void> {
    if (!this.component || !this.show) return;
    const orderedContainer: ViewContainerRef = await new Promise((resolve) => {
      const checkIfDefined = () => {
        const timeout = setTimeout(checkIfDefined, 100);
        if (this.orderedViewContainer) {
          clearTimeout(timeout);
          resolve(this.orderedViewContainer);
        }
      };
      checkIfDefined();
    });
    orderedContainer.createComponent(this.component);
  }
}
