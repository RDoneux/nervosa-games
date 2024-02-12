import { IAboutUsData } from './i-about-us-data';

export interface IAboutUsCollaborators extends IAboutUsData {
  key: {
    founder: ICollaborator;
    marketingManager: ICollaborator;
    developer: ICollaborator;
  };
}

export interface ICollaborator {
  name: string;
  image: string;
  title: string;
  text: string;
  linkedIn: string;
}
