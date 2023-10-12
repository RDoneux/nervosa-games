import { Type } from "@angular/core";

export interface IFooterLink {
  label: string;
  url: string;
  content: Type<unknown>;
}
