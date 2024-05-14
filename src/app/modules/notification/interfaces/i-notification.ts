export interface INotification {
  title: string;
  type: NotificationType;
  timer?: number;
  id?: string;
  yesLabel?: string;
  noLabel?: string;
}

export const NotificationType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info',
  ARE_YOU_SURE: 'sure'
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];
