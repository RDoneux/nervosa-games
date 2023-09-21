import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFooterLink } from '../../interfaces/i-footer-link.interface';
import { footerLinks } from 'src/app/data/footer-links.data';
import packageJson from '../../../../../../package.json';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public footerLinks: IFooterLink[] = footerLinks;
  public version: string = packageJson.version;
}
