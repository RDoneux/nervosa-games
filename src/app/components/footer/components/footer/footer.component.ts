import { Component, Type } from '@angular/core';
import { IFooterLink } from '../../interfaces/i-footer-link.interface';
import { footerLinks } from 'src/app/data/footer-links.data';
import packageJson from '../../../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public footerLinks: IFooterLink[] = footerLinks;
  public version: string = packageJson.version;

  public showModal: boolean = false;
  public modalContent!: Type<unknown>;

  openModal(footer: IFooterLink): void {
    this.showModal = true;
    this.modalContent = footer.content;
  }
}
