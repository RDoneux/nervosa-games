import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
})
export class ShareComponent {
  @Input({ required: true }) image!: string;
  @Input({ required: true }) subTitle!: string;
  @Input({ required: true }) title!: string;

  public copied: boolean = false;

  saveValueToClipboard(): void {
    navigator.clipboard.writeText(this.createUrl());
    this.copied = true;
  }

  private createUrl(): string {
    return `${environment.apiRoot}/share?${new HttpParams()
      .set('image', this.image)
      .set('url', location.href)
      .set('subTitle', this.subTitle)
      .set('title', this.title)
      .toString()}`;
  }
}
