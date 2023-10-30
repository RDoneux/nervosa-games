import { ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-collapsable-section',
  templateUrl: './collapsable-section.component.html',
  styleUrls: ['./collapsable-section.component.scss'],
})
export class CollapsableSectionComponent {
  @Input() collapsed: boolean = false;
  @Input() label!: string;

  @ViewChild('collapsableContent')
  private _content!: ElementRef;
  public get content(): HTMLElement {
    return this._content.nativeElement;
  }

  public contentHeight!: number;

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  onToggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  ngAfterViewInit(): void {
    this.contentHeight = this.content.scrollHeight;
    this.changeDetectorRef.detectChanges();
  }
}
