import { Component, Type } from '@angular/core';
import { IFooterLink } from '../../interfaces/i-footer-link.interface';
import { footerLinks } from 'src/app/data/footer-links.data';
import packageJson from '../../../../../../package.json';
import { TEnvironmentName } from 'src/environments/environment-names';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public footerLinks: IFooterLink[] = footerLinks;
  public version: string = packageJson?.version ?? 'unknown';

  public showModal: boolean = false;
  public modalContent!: Type<unknown>;
  public currentYear: number = new Date().getFullYear();
  public environmentName: TEnvironmentName = environment.name;

  openModal(footer: IFooterLink): void {
    this.showModal = true;
    this.modalContent = footer.content;
  }
}
