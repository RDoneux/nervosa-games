export const IPostMode = {
  EDIT: 'edit',
  CREATE: 'create',
} as const;

export type IPostMode = (typeof IPostMode)[keyof typeof IPostMode];
