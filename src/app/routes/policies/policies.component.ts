import { Component } from '@angular/core';
import { IFooterLink } from 'src/app/components/footer/interfaces/i-footer-link.interface';
import { footerLinks } from 'src/app/data/footer-links.data';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent {

  public footerLinks: IFooterLink[] = footerLinks;

}
