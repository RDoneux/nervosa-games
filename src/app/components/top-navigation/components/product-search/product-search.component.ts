import { Component, Input } from '@angular/core';
import { ISocialMediaIconLink } from '../../interfaces/i-social-media-icon-link.interface';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent {

  @Input({required: true}) socialMediaIconLinks: ISocialMediaIconLink[] = []

  public searchTerm!: string;

}
