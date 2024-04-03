import { TEnvironmentName } from "./environment-names";

export interface IEnvironment {
    debug: string[];
    firebase: any;
    siteKey: string;
    name: TEnvironmentName;
}