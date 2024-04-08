import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import copy from 'copy-to-clipboard'

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrl: './share.component.scss',
})
export class ShareComponent {
  @Input({ required: true }) image!: string;
  @Input({ required: true }) subTitle!: string;
  @Input({ required: true }) title!: string;

  constructor() {}

  saveValueToClipboard(): void {
    const url: string = `${environment.apiRoot}/share?${
      new HttpParams()
        .set('image', this.image)
        .set('url', location.href)
        .set('subTitle', this.subTitle)
        .set('title', this.title)
        .toString()
    }`;

    copy(url)
  }
}
