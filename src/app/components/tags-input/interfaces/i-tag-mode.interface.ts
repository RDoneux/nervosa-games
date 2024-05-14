export const ITagMode = {
    EDIT: 'edit',
    DISPLAY: 'display',
  } as const;
  
  export type ITagMode = (typeof ITagMode)[keyof typeof ITagMode];
  