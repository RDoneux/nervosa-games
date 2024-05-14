export const TEnvironmentName = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: '✧',
} as const;
export type TEnvironmentName =
  (typeof TEnvironmentName)[keyof typeof TEnvironmentName];

// --------------------------------- //

export const TAPIRoot = {
  DEVELOPMENT: 'https://api-wxlinn2yaq-uc.a.run.app',
  STAGING: 'https://api-wxlinn2yaq-uc.a.run.app',
  PRODUCTION: 'https://api-oceuxepkpq-uc.a.run.app',
} as const;
export type TAPIRoot = (typeof TAPIRoot)[keyof typeof TAPIRoot];
