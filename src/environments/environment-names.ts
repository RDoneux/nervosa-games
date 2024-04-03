  
  export const TEnvironmentName = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    PRODUCTION: '✧'
  } as const;
  
  export type TEnvironmentName =
    (typeof TEnvironmentName)[keyof typeof TEnvironmentName];
  