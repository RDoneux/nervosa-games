export const TCollaboratorLevel = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export type TCollaboratorLevel =
  (typeof TCollaboratorLevel)[keyof typeof TCollaboratorLevel];
